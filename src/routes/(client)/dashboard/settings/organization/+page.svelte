<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
    import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { clientFormSchema, type ClientFormSchema } from '../../../../onboarding/(components)/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Client } from '$lib/types/client';
	import { companySizeOptions, industryOptions } from '$lib/utils';

    let { data }: { data: { form: SuperValidated<Infer<ClientFormSchema>>, client: Client } } = $props();

    const form = superForm(data.form, {
        validators: zodClient(clientFormSchema),
        onUpdated: ({ form }) => {
            if (form.valid) {
                // Handle success and redirect to plan selection
                window.location.href = '/onboarding/plan';
            }
        },
    });
    const { form: formData, enhance, delayed } = form;
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

    <form method="POST" use:enhance>
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
                </div>
            </Card.Content>
            <Card.Footer>
                <Button type="submit" disabled={$delayed}>{$delayed ? 'Updating...' : 'Update Organization'}</Button>
            </Card.Footer>
        </Card.Root>
    </form>
</div>