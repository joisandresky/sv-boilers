<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { User } from 'better-auth';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { user: User } } = $props();

	// Mock data for now
	let profile = $state({
		name: data.user.name,
		email: data.user.email,
		image: data.user.image,
	});
	let isLoading = $state(false);

	async function updateProfile() {
		isLoading = true;
		await authClient.updateUser({
			name: profile.name,
			image: profile.image,
		});

		isLoading = false;
		toast.success('Profile updated');
	}
</script>

<svelte:head>
	<title>Settings - Account</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">
			Manage your account settings.
		</p>
	</div>

	<Card.Root>
		<Card.Content class="space-y-6">
			<div class="space-y-4">
				<!-- name -->
				<div class="space-y-2">
					<Label>Name</Label>
					<Input bind:value={profile.name} />
				</div>

				<!-- Email -->
				<div class="space-y-2">
					<Label>Email</Label>
					<Input value={profile.email} disabled />
				</div>

				<!-- User Profile Image -->
				<div class="space-y-2">
					<Label>User Profile Image</Label>
					<img src={profile.image || 'https://api.dicebear.com/9.x/micah/svg?seed=Caleb'} alt="Profile image" class="w-20 h-20 rounded" />
				</div>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button onclick={updateProfile} disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Profile'}</Button>
		</Card.Footer>
	</Card.Root>
</div>