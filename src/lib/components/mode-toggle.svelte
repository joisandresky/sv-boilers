<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import type { ComponentProps } from 'svelte';
	import { cn } from '$lib/utils';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof Button> = $props();
</script>

<Button
	onclick={toggleMode}
	variant="ghost"
	size="icon"
	class={cn('h-7 w-7', className)}
	{...restProps}
>
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
