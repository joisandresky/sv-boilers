// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session, User } from "better-auth";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session,
			user: User,
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string, mode: 'toast' | 'alert' = 'toast' };
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
