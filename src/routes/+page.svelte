<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";

	const session = authClient.useSession();

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if $session.data}
<div class="p-4">
	<a href="/dashboard">Goto Dashboard</a>
	<Button onclick={async () => await authClient.signOut()}>
		{$session.data.user.name} <Separator orientation="vertical" />
		Logout
	</Button>
</div>
{:else}
<div class="p-4">
	<a href="/login">Login</a>
</div>
{/if}