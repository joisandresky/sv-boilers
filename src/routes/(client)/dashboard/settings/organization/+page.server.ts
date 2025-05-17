import { getClientByUserId, updateClient } from "$lib/server/repository/client_repo";
import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { clientFormSchema } from "../../../../onboarding/(components)/schema";
import { superValidate } from "sveltekit-superforms";
import { fail, type Actions } from "@sveltejs/kit";
import type { Client } from "$lib/types/client";
import type { companySizeOptions, industryOptions } from "$lib/utils";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    const client = await getClientByUserId(locals.user.id);

    if (!client) {
        redirect(302, '/login', {
            message: 'Please login to continue',
            type: 'error',
            mode: 'toast'
        }, cookies);
    }

    const form = await superValidate(zod(clientFormSchema), {
        defaults: {
            companyName: client.companyName,
            email: client.email,
            phone: client.phone || undefined,
            website: client.website || undefined,
            companySize: client.companySize as typeof companySizeOptions[number],
            industry: client.industry as typeof industryOptions[number],
        }
    });

    return {
        client,
        form,
    }
};

export const actions = {
    default: async ({ request, locals, cookies }) => {
        const form = await superValidate(request, zod(clientFormSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const client = await getClientByUserId(locals.user.id);

        if (!client) {
            console.error('Client not found for user', locals.user.id);
            redirect(302, '/dashboard/settings/organization', {
                message: 'Something went wrong, please try again',
                type: 'error',
                mode: 'toast'
            }, cookies);
        }

        const updatedClient = await updateClient(client.id, form.data as Client);

        if (!updatedClient) {
            console.error('Failed to update client', locals.user.id);
            redirect(302, '/dashboard/settings/organization', {
                message: 'Failed to update organization, please try again',
                type: 'error',
                mode: 'toast'
            }, cookies);
        }

        redirect(303, '/dashboard/settings/organization', {
            message: 'Organization updated successfully',
            type: 'success',
            mode: 'toast'
        }, cookies);
    }
} satisfies Actions;