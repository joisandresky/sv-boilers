import { NODE_ENV, POLAR_ACCESS_TOKEN } from '$env/static/private';
import { Polar } from '@polar-sh/sdk';

export const client = new Polar({
	accessToken: POLAR_ACCESS_TOKEN,
	// Use 'sandbox' if you're using the Polar Sandbox environment
	// Remember that access tokens, products, etc. are completely separated between environments.
	// Access tokens obtained in Production are for instance not usable in the Sandbox environment.
	server: NODE_ENV === 'production' ? 'production' : 'sandbox'
});
