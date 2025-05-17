<script>
	import Icon from '@iconify/svelte';
	import RegisterForm from './(components)/register-form.svelte';

	const { data } = $props();
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<a href="/" class="flex items-center gap-2 self-center font-medium" aria-label="Home">
			<div
				class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
			>
				<Icon icon="lucide:gallery-vertical-end" class="size-4" />
			</div>
			Acme Inc
		</a>

		<RegisterForm {data} />
	</div>
</div>
