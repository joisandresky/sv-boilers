// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Client } from '$lib/types/client';
import type { Subscription } from '$lib/types/subscription';
import type { Session, User } from 'better-auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session;
			user: User;
			client: Client;
			subscription: Subscription;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string; mode: 'toast' | 'alert' };
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
