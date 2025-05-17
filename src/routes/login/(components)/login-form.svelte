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
	import { Label } from '$lib/components/ui/label';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';

	import { authClient } from '$lib/auth-client';

	async function onSignInWithGoogle() {
		const data = await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/dashboard'
		});
	}

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);

	async function onSignIn() {
		const { data, error } = await authClient.signIn.email(
			{
				email: email,
				password: password,
				callbackURL: '/dashboard'
			},
			{
				onRequest: (ctx) => {
					isLoading = true;
				},
				onError: (ctx) => {
					isLoading = false;
					toast.error(ctx.error.statusText, {
						description: ctx.error.message || 'Something went wrong'
					});
				}
			}
		);
	}
</script>

<svelte:head>
	<title>Acme Inc - Login</title>
</svelte:head>
<div class="flex flex-col gap-6">
	<Card>
		<CardHeader class="text-center">
			<CardTitle class="text-xl">Welcome back</CardTitle>
			<CardDescription>Sign in with your Google Account</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid gap-6">
				<div class="flex flex-col gap-4">
					<Button onclick={onSignInWithGoogle} variant="outline" class="w-full" type="button">
						<Icon icon="devicon:google" class="mr-2 h-4 w-4" />
						Login With Google
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
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							name="email"
							bind:value={email}
						/>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="/forgot-password" class="ml-auto text-sm underline-offset-4 hover:underline">
								Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required name="password" bind:value={password} />
					</div>
					<Button type="submit" class="w-full" disabled={isLoading} onclick={onSignIn}>
						{#if isLoading}
							<Icon icon="lucide:loader" class="mr-2 animate-spin" />
							Loading...
						{:else}
							Login
						{/if}
					</Button>
				</div>
				<div class="text-center text-sm">
					Don&apos;t have an account?{' '}
					<a href="/register" class="underline underline-offset-4"> Sign up </a>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
