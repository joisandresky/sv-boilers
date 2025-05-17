import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clientFormSchema } from './(components)/schema';
import { createClient } from '$lib/server/repository/client_repo';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import { redirect } from 'sveltekit-flash-message/server';

export const load = (async ({ locals, cookies }) => {
	if(locals.client) {
		redirect(302, '/onboarding/plan', { type: 'error', message: 'Please select your plan', mode: 'toast' }, cookies);
	}

	const form = await superValidate(zod(clientFormSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, cookies }) => {
		if(locals.subscription) {
			redirect(302, '/dashboard');
		}

		if(locals.client) {
			redirect(302, '/onboarding/plan', { type: 'error', message: 'Please select your plan', mode: 'toast' }, cookies);
		}

		const form = await superValidate(request, zod(clientFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const client = await createClient({
			id: uuidv4(),
			slug: slugify(form.data.companyName, { lower: true }),
			isActive: true,
			ownerUserId: locals.user.id,
			companyName: form.data.companyName,
			companySize: form.data.companySize,
			industry: form.data.industry,
			email: form.data.email,
			phone: form.data.phone || '',
			website: form.data.website || '',
			createdAt: new Date(),
			updatedAt: new Date()
		});

		if (!client) {
			redirect(302, '/onboarding', { type: 'error', message: 'Failed to save company information', mode: 'toast' }, cookies);
		}

		// locals.client = client;
		redirect(302, '/onboarding/plan', { type: 'success', message: 'Company Information Saved!', mode: 'toast' }, cookies);
	}
} satisfies Actions;
