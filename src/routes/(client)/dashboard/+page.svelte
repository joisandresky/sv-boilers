<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let { data } = $props();

	async function onLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto('/login');
				}
			}
		});
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="text-2xl">Welcome, {data.user.name}!</div>
