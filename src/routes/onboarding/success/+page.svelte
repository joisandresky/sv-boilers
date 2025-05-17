<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-4 text-center">
			<div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
				<svg
					class="h-12 w-12 text-primary"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<Card.Title class="text-3xl font-extrabold">Welcome to Reflectify!</Card.Title>
			<Card.Description class="text-xl">
				Your account has been successfully created. We're excited to help you gather and analyze
				feedback more effectively.
			</Card.Description>
		</Card.Header>
		<Card.Footer class="mt-8 flex justify-center">
			<Button href="/dashboard" class="w-full sm:w-auto">Go to Dashboard</Button>
		</Card.Footer>
	</Card.Root>
</div>
