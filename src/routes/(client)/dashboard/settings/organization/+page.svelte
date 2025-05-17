<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
    import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import FileUpload from '$lib/components/file-upload.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { clientFormSchema, type ClientFormSchema } from '../../../../onboarding/(components)/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Client } from '$lib/types/client';
	import { companySizeOptions, industryOptions } from '$lib/utils';
	import X from '@lucide/svelte/icons/x';
	import { toast } from 'svelte-sonner';

    let { data }: { data: { form: SuperValidated<Infer<ClientFormSchema>>, client: Client } } = $props();
	let avatarFiles: File[] = $state([]);
	let showFileUpload = $state(!data.client.avatar);

    const form = superForm(data.form, {
        validators: zodClient(clientFormSchema),
        taintedMessage: null,
        dataType: 'form',
        resetForm: false,
        onUpdated: ({ form }) => {
            if (form.valid) {
                toast.success('Organization settings updated successfully');
                showFileUpload = false;
            }
        }
    });
    const { form: formData, enhance, delayed, message } = form;

	function removeAvatar() {
		$formData.avatar = undefined;
		avatarFiles = [];
		showFileUpload = true;
	}

	$effect(() => {
		if (avatarFiles.length > 0) {
			showFileUpload = true;
		}
	});

    $effect(() => {
        if ($message) {
            // You can handle success/error messages here if needed
            console.log('Form message:', $message);
        }
    });
</script>

<svelte:head>
	<title>Settings - Organization</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">
			Manage your account settings.
		</p>
	</div>

    <form 
		method="POST" 
		enctype="multipart/form-data"
		use:enhance
	>
        <Card.Root>
            <Card.Content class="space-y-6">
                <div class="space-y-4">
                    <!-- name -->
                    <Form.Field {form} name="companyName">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Organization Name</Form.Label>
                                <Input {...props} bind:value={$formData.companyName} />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="email">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Organization Email</Form.Label>
                                <Input {...props} bind:value={$formData.email} />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="phone">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Phone Number (Optional)</Form.Label>
                                <Input type="tel" {...props} bind:value={$formData.phone} placeholder="+1 (555) 000-0000" />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="website">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Organization Website (Optional)</Form.Label>
                                <Input type="url" {...props} bind:value={$formData.website} placeholder="https://example.com" />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="companySize">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Organization Size</Form.Label>
                                <Select.Root type="single" bind:value={$formData.companySize} name={props.name}>
                                    <Select.Trigger {...props}>
                                        {$formData.companySize || 'Select company size'}
                                    </Select.Trigger>
                                    <Select.Content>
                                        {#each companySizeOptions as size}
                                            <Select.Item value={size} label={size} />
                                        {/each}
                                    </Select.Content>
                                </Select.Root>
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="industry">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Industry</Form.Label>
                                <Select.Root type="single" bind:value={$formData.industry} name={props.name}>
                                    <Select.Trigger {...props}>
                                        {$formData.industry || 'Select industry'}
                                    </Select.Trigger>
                                    <Select.Content>
                                        {#each industryOptions as industry}
                                            <Select.Item value={industry} label={industry} />
                                        {/each}
                                    </Select.Content>
                                </Select.Root>
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

					<Form.Field {form} name="avatar">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Organization Logo</Form.Label>
								{#if !showFileUpload && data.client.avatar}
									<div class="relative w-32">
										<img
											src={data.client.avatar}
											alt="Organization logo"
											class="h-32 w-32 rounded-lg object-cover"
										/>
										<button
											type="button"
											class="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
											onclick={removeAvatar}
										>
											<X class="size-4" />
											<span class="sr-only">Remove logo</span>
										</button>
									</div>
									<Button
										type="button"
										variant="outline"
										class="mt-2"
										onclick={() => showFileUpload = true}
									>
										Change Logo
									</Button>
								{:else}
									<FileUpload
										accept="image/*"
										maxSize={2}
										bind:files={avatarFiles}
									/>
                                    <Form.Description>
                                        Upload your organization logo. Maximum size 2MB. Supported formats: PNG, JPG, GIF.
                                    </Form.Description>
								{/if}
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
                </div>
            </Card.Content>
            <Card.Footer>
                <Button type="submit" disabled={$delayed}>{$delayed ? 'Updating...' : 'Update Organization'}</Button>
            </Card.Footer>
        </Card.Root>
    </form>
</div>