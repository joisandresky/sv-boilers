import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.session) {
        redirect(302, '/login');
    }

    // TODO: check if the user has subscription or not, if not redirect to onboarding page

    return {
        user: locals.user
    };
};