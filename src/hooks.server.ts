import { auth } from '$lib/auth';
import { getClientByUserId } from '$lib/server/repository/client_repo';
import { getSubscriptionByUserId } from '$lib/server/repository/subscription_repo';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export async function handle({ event, resolve }) {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;

		const client = await getClientByUserId(session?.user.id);

		if (client) {
			event.locals.client = client;
		}

		const subscription = await getSubscriptionByUserId(session?.user.id);

		if (subscription) {
			event.locals.subscription = subscription;
		}
	}

	return svelteKitHandler({ event, resolve, auth });
}
