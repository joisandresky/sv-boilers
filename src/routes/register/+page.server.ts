import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './(components)/schema';
import { fail } from '@sveltejs/kit';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { auth } from '$lib/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formSchema));
		if (!form.valid) {
			setFlash({ type: 'error', message: 'Invalid form', mode: 'toast' }, cookies);
			return fail(400, {
				form
			});
		}

		const res = await auth.api.signUpEmail({
			body: {
				name: form.data.name,
				email: form.data.email,
				password: form.data.password
			},
			asResponse: true,
			returnHeaders: true
		});

		if (res.ok) {
			redirect(
				303,
				'/login',
				{ type: 'success', message: 'Successfully registered', mode: 'toast' },
				cookies
			);
		} else {
			const body = (await res.json()) as APIError;
			redirect(
				302,
				'/register',
				{ type: 'error', message: body.message || 'Something went wrong', mode: 'toast' },
				cookies
			);
		}
	}
} satisfies Actions;
