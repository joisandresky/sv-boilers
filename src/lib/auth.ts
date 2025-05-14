import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/db";
import * as schema from "./server/db/schemas";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, POLAR_ACCESS_TOKEN, POLAR_WEBHOOK_SECRET } from "$env/static/private";
import { admin } from "better-auth/plugins";
import { client as polarClient } from "./polar";
import { polar } from "@polar-sh/better-auth";
 
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql",
    schema: {
      ...schema,
      user: schema.user,
    },
  }), 
  plugins: [
    admin({
      adminRoles: ["admin"],
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
            products: [
                {
                    productId: "e92ed658-1e01-45ea-8b61-9045b0c5b77d", // ID of Product from Polar Dashboard
                    slug: "free" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                },
                {
                    productId: "6e3516f2-4d38-4003-a0ce-9b5793546a7d", // ID of Product from Polar Dashboard
                    slug: "essential" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                },

            ],
            successUrl: "/onboarding/success?checkout_id={CHECKOUT_ID}",
            authenticatedUsersOnly: true,
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
              case 'subscription.canceled':
                data = payload.data;
                console.log('customer canceling subscription', data);
                break;
              case 'subscription.revoked':
                data = payload.data;
                console.log('customer revoking subscription', data);
                break;
              case 'subscription.updated':
                data = payload.data;
                console.log('customer updating subscription', data);
                break;
              default:
                console.log('unhandled event', payload);
            }
          }
        },
    })
  ]
});