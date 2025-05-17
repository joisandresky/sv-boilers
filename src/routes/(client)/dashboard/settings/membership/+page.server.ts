import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { subscription } = await parent();

	return {
		subscription
	}
}