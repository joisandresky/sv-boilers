<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { polar_products } from '$lib/pricing.js';

	const { data } = $props();

	const pricingPlans = {
		free: polar_products[0],
		pro: polar_products[1],
	}

	const currentPlan = $derived.by(() => {
		const sub = polar_products.find(p => p.productId === data.subscription.product_id);

		if (!sub) return pricingPlans.free;
		
		return pricingPlans[sub.slug as keyof typeof pricingPlans];
	});
</script>

<svelte:head>
	<title>Settings - Membership</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
	<div>
		<h3 class="text-lg font-medium">Membership</h3>
		<p class="text-sm text-muted-foreground">
			Manage your subscription and billing.
		</p>
		</div>
		<Button onclick={() => goto('/api/auth/portal')}>
			Manage Subscription
		</Button>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		{#each Object.entries(pricingPlans) as [key, plan]}
			<Card.Root class="relative flex flex-col {currentPlan.name === plan.name ? 'border-primary' : ''}">
				{#if currentPlan.name === plan.name}
					<div class="absolute -top-3 left-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
						Current Plan
					</div>
				{/if}
				<Card.Header>
					<Card.Title>{plan.name}</Card.Title>
					<Card.Description class="flex items-baseline">
						<span class="text-3xl font-bold">${plan.price}</span>
						<span class="text-muted-foreground ml-1">/month</span>
			</Card.Description>
		</Card.Header>
				<Card.Content class="flex-grow">
					<ul class="space-y-4">
						{#each plan.features as feature}
							<li class="flex items-center">
								<svg
									class="mr-2 h-5 w-5 text-primary"
							fill="none"
							stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
							stroke-linecap="round"
							stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
						</svg>
								{feature}
							</li>
						{/each}
					</ul>
		</Card.Content>
		<Card.Footer>
		</Card.Footer>
	</Card.Root>
		{/each}
	</div>
</div>