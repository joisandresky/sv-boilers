<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Form from "$lib/components/ui/form";
    import Icon from "@iconify/svelte";

    import { authClient } from "$lib/auth-client";
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type RegisterFormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	async function onSignInWithGoogle() {
		await authClient.signIn.social({
			provider: 'google',
            callbackURL: '/dashboard',
		})
	}

	let { data }: { data: { form: SuperValidated<Infer<RegisterFormSchema>> } }= $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
	});

	const { form: formData, enhance, delayed } = form;
</script>

<svelte:head>
	<title>Acme Inc - Login</title>
</svelte:head>
<div class="flex flex-col gap-6">
	<Card>
		<CardHeader class="text-center">
			<CardTitle class="text-xl">Welcome!</CardTitle>
			<CardDescription>Register with your Google Account</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid gap-6">
				<div class="flex flex-col gap-4">
                    <Button onclick={onSignInWithGoogle} variant="outline" class="w-full" type="button">
                        <Icon icon="devicon:google" class="mr-2 h-4 w-4" />
                        Continue With Google
                    </Button>
				</div>
				<div
					class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
				>
					<span class="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
				<div class="grid gap-6">
					<form method="POST" use:enhance>
						<Form.Field {form} name="name">
							<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="email">
							<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input {...props} bind:value={$formData.email} />
							{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="password">
							<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input type="password" {...props} bind:value={$formData.password} />
							{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="password_confirmation">
							<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password Confirmation</Form.Label>
								<Input type="password" {...props} bind:value={$formData.password_confirmation} />
							{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Button class="w-full mt-4" disabled={$delayed} type="submit">
							{#if $delayed}
								<Icon icon="lucide:loader" class="mr-2 animate-spin" />
								Loading...
							{:else}
								Sign Up Now
							{/if}
						</Form.Button>
					</form>
				</div>
				<div class="text-center text-sm">
					Already have an account?{' '}
					<a href="/login" class="underline underline-offset-4"> Sign In </a>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
