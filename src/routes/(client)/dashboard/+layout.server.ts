import { redirect } from 'sveltekit-flash-message/server';
import type { LayoutServerLoad } from './$types';
import { getSubscriptionByUserId } from '$lib/server/repository/subscription_repo';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (!locals.session) {
		redirect(302, '/login', { type: 'error', message: 'Please login to continue', mode: 'toast' }, cookies);
	}

	if (!locals.client) {
		redirect(302, '/onboarding', { type: 'error', message: 'Please complete the onboarding process', mode: 'toast' }, cookies);
	}

	if (!locals.subscription) {
		redirect(302, '/onboarding', { type: 'error', message: 'Please complete the onboarding process', mode: 'toast' }, cookies);
	}

	if (locals.subscription.status !== 'active') {
		redirect(302, '/onboarding', { type: 'error', message: 'Please complete the onboarding process', mode: 'toast' }, cookies);
	}

	if (locals.subscription.current_period_end && locals.subscription.current_period_end < new Date()) {
		redirect(302, '/onboarding', { type: 'error', message: 'Please complete the onboarding process', mode: 'toast' }, cookies);
	}

	return {
		user: locals.user,
		client: locals.client,
		subscription: locals.subscription
	};
};
