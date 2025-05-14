<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { getFlash } from 'sveltekit-flash-message';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/state';
	import '../app.css';
	import { toast } from 'svelte-sonner';

	let { children } = $props();

	const flash = getFlash(page);

	$effect(() => {
		if (!$flash) return;

		if ($flash.type === 'success') {
			toast.success($flash.message);
		} else {
			toast.error($flash.message);
		}

		// Clear the flash message to avoid double-toasting.
		$flash = undefined;
	});
</script>

<ModeWatcher />
<Toaster />

{@render children()}
