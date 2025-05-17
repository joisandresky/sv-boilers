import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './server/db';
import * as schema from './server/db/schemas';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	POLAR_WEBHOOK_SECRET
} from '$env/static/private';
import { admin } from 'better-auth/plugins';
import { client as polarClient } from './polar';
import { polar } from '@polar-sh/better-auth';
import { cancelSubscription, createSubscription, getSubscriptionByUserId, updateSubscription } from './server/repository/subscription_repo';
import { v4 } from 'uuid';
import { polar_products } from './pricing';

export const auth = betterAuth({
	trustedOrigins: ['http://localhost:5173', 'http://weasel-bright-boar.ngrok-free.app'],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6
	},
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string
		}
	},
	database: drizzleAdapter(db, {
		provider: 'pg', // or "pg" or "mysql",
		schema: {
			...schema,
			user: schema.user
		}
	}),
	plugins: [
		admin({
			adminRoles: ['admin']
		}),
		polar({
			client: polarClient,
			// Enable automatic Polar Customer creation on signup
			createCustomerOnSignUp: true,
			// Enable customer portal
			enableCustomerPortal: true, // Deployed under /portal for authenticated users
			// Configure checkout
			checkout: {
				enabled: true,
				products: polar_products,
				successUrl: '/onboarding/success?checkout_id={CHECKOUT_ID}',
				authenticatedUsersOnly: true
			},
			// Incoming Webhooks handler will be installed at /polar/webhooks
			webhooks: {
				secret: POLAR_WEBHOOK_SECRET,
				onPayload: async (payload) => {
					let data;
					switch (payload.type) {
						case 'subscription.active':
							data = payload.data;
							console.log('new customer subscribed', data);
							break;
						case 'subscription.created':
							data = payload.data;
							
							await createSubscription({
								id: v4(),
								user_id: data.customer.externalId,
								product_id: data.productId,
								subscription_id: data.id,
								customer_id: data.customer.id,
								current_period_end: data.currentPeriodEnd,
								status: data.status,
								createdAt: new Date(),
								updatedAt: new Date()
							})

							console.info('new subscription created', data);
							break;
						case 'subscription.canceled':
							data = payload.data;
							console.log('customer canceling subscription', data);
							// await cancelSubscription(data.id, 'canceled');
							break;
						case 'subscription.revoked':
							data = payload.data;
							console.log('customer revoking subscription', data);
							await cancelSubscription(data.id, 'revoked');
							break;
						case 'subscription.updated':
							data = payload.data;
							console.log('customer updating subscription', data);
							const currentSub = await getSubscriptionByUserId(data.customer.externalId!);
							// handle subscription changes, if the product id is different, we need to update the subscription
							if(currentSub && (data.productId != currentSub.product_id)) {
								currentSub.subscription_id = data.id;
								currentSub.product_id = data.productId;
								currentSub.current_period_end = data.currentPeriodEnd;
								currentSub.status = data.status;
								currentSub.updatedAt = new Date();
								await updateSubscription(currentSub);
							}
							break;
						default:
							console.log('unhandled event', payload.type);
					}
				}
			}
		})
	]
});
