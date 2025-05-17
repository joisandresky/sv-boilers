import type { PageServerLoad } from "./$types";
import { redirect } from "sveltekit-flash-message/server";
import { getClientByUserId } from "$lib/server/repository/client_repo";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.session) {
        redirect(302, '/login', { type: 'error', message: 'Please login to continue', mode: 'toast' }, cookies);
    }

    const { client } = locals;

    if (!client) {
        redirect(302, '/onboarding', { type: 'error', message: 'Please complete the onboarding process', mode: 'toast' }, cookies);
    }

    return {
        client: client
    }
}