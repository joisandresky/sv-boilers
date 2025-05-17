import { getClientByUserId, updateClient } from "$lib/server/repository/client_repo";
import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { clientFormSchema } from "../../../../onboarding/(components)/schema";
import { superValidate } from "sveltekit-superforms";
import { fail, type Actions } from "@sveltejs/kit";
import type { Client } from "$lib/types/client";
import type { companySizeOptions, industryOptions } from "$lib/utils";
import { uploadFileToS3 } from "$lib/s3client";

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
            avatar: client.avatar || undefined,
        }
    });

    return {
        client,
        form,
    }
};

export const actions = {
    default: async ({ request, locals, cookies }) => {
        const formData = await request.formData();
        const form = await superValidate(formData, zod(clientFormSchema));
        
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

        // Handle avatar upload
        const avatarFile = formData.get('avatar') as File | null;
        let avatarUrl = client.avatar; // Keep existing avatar by default

        if (avatarFile instanceof File && avatarFile.size > 0) {
            try {
                // Validate file type
                if (!avatarFile.type.startsWith('image/')) {
                    return fail(400, {
                        form,
                        error: 'Invalid file type. Please upload an image file.'
                    });
                }

                // Validate file size (2MB)
                if (avatarFile.size > 2 * 1024 * 1024) {
                    return fail(400, {
                        form,
                        error: 'File size exceeds 2MB limit.'
                    });
                }

                const fileName = `${Date.now()}-${avatarFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
                avatarUrl = await uploadFileToS3(
                    avatarFile,
                    `organizations/${client.slug}/avatar/${fileName}`,
                    "public-read"
                );

                if (!avatarUrl) {
                    return fail(500, {
                        form,
                        error: 'Failed to upload avatar. Please try again.'
                    });
                }
            } catch (error) {
                console.error('Failed to upload avatar:', error);
                return fail(500, {
                    form,
                    error: 'Failed to upload avatar. Please try again.'
                });
            }
        } else if (form.data.avatar === undefined) {
            // Avatar was explicitly removed
            avatarUrl = null;
        }

        try {
            const { avatar: _, ...clientData } = form.data;
            
            const updatedClient = await updateClient(client.id, {
                ...clientData,
                avatar: avatarUrl
            } as Client);

            // Create a new form with the updated data
            const newForm = await superValidate(
                { ...clientData, avatar: avatarUrl },
                zod(clientFormSchema)
            );

            return {
                form: newForm,
                client: updatedClient
            };
        } catch (error) {
            console.error('Failed to update client:', error);
            return fail(500, {
                form,
                error: 'Failed to update organization settings. Please try again.'
            });
        }
    }
} satisfies Actions;