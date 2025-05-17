import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.session) {
		redirect(302, '/login');
	}

	if(locals.subscription) {
		redirect(302, '/dashboard');
	}

	return {
		user: locals.user
	};
};
