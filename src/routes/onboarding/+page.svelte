<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { superForm, type SuperValidated } from 'sveltekit-superforms/client';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
	import { clientFormSchema, type ClientFormSchema } from './(components)/schema';

	let { data }: { data: { form: SuperValidated<Infer<ClientFormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(clientFormSchema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				// Handle success and redirect to plan selection
				window.location.href = '/onboarding/plan';
			}
		}
	});
	const { form: formData, enhance } = form;

	const companySizeOptions = [
		'1-10 employees',
		'11-50 employees',
		'51-200 employees',
		'201-500 employees',
		'500+ employees'
	] as const;

	const industryOptions = [
		'SaaS',
		'E-commerce',
		'FinTech',
		'Healthcare',
		'Education',
		'Other'
	] as const;
</script>

<div class="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl font-bold">Welcome to Reflectify</h2>
			<p class="text-muted-foreground mt-2">Let's get your account set up</p>
		</div>

		<form method="POST" use:enhance>
			<!-- Client Information Form -->
			<Card.Root class="p-6">
				<Card.Header class="pb-4">
					<Card.Title>Company Information</Card.Title>
					<Card.Description>
						Tell us about your business to help us serve you better.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<Form.Field {form} name="companyName">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Name</Form.Label>
								<Input {...props} bind:value={$formData.companyName} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Email</Form.Label>
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
								<Form.Label>Company Website (Optional)</Form.Label>
								<Input type="url" {...props} bind:value={$formData.website} placeholder="https://example.com" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="companySize">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Company Size</Form.Label>
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
				</Card.Content>
			</Card.Root>

			<!-- Submit Button -->
			<div class="flex justify-center mt-8">
				<Button type="submit" size="lg" class="px-8">
					Continue to Plan Selection
				</Button>
			</div>
		</form>
	</div>
</div>
