<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let selectedPlan: 'free' | 'pro' = $state('free');

	function handlePlanSelection() {
		goto(`/api/auth/checkout/${selectedPlan}`);
	}
</script>
<svelte:head>
	<title>Reflectify - Choose Your Plan</title>
</svelte:head>
<div class="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl font-bold">Welcome to Reflectify</h2>
			<p class="text-muted-foreground mt-2">One last step to complete your setup</p>
		</div>

		<Card.Root class="p-6">
			<Card.Header class="pb-4">
				<Card.Title>Choose Your Plan</Card.Title>
				<Card.Description>
					Select the plan that best fits your needs
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-6 sm:grid-cols-2">
					<!-- Free Plan -->
					<Card.Root 
						class="relative cursor-pointer transition-all hover:border-primary/50 {selectedPlan === 'free' ? 'border-2 border-primary' : 'border border-border'}"
						onclick={() => selectedPlan = 'free'}
					>
						<Card.Header>
							<Card.Title>Free Plan</Card.Title>
							<Card.Description>
								<span class="text-2xl font-bold">$0</span>
								<span class="text-muted-foreground">/month</span>
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<ul class="list-inside list-disc space-y-2">
								<li>100 feedbacks/month</li>
								<li>Basic sentiment analysis</li>
								<li>Email notifications</li>
								<li>Basic analytics</li>
							</ul>
						</Card.Content>
						<div class="absolute right-4 top-4">
							<div class="h-4 w-4 rounded-full border-2 {selectedPlan === 'free' ? 'border-primary bg-primary' : 'border-muted'}"></div>
						</div>
					</Card.Root>

					<!-- Pro Plan -->
					<Card.Root 
						class="relative cursor-pointer transition-all hover:border-primary/50 {selectedPlan === 'pro' ? 'border-2 border-primary' : 'border border-border'}"
						onclick={() => selectedPlan = 'pro'}
					>
						<Card.Header>
							<Card.Title>Pro Plan</Card.Title>
							<Card.Description>
								<span class="text-2xl font-bold">$19</span>
								<span class="text-muted-foreground">/month</span>
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<ul class="list-inside list-disc space-y-2">
								<li>Unlimited feedbacks</li>
								<li>Advanced AI analysis</li>
								<li>Email & Slack notifications</li>
								<li>Advanced analytics & trends</li>
								<li>Priority support</li>
							</ul>
						</Card.Content>
						<div class="absolute right-4 top-4">
							<div class="h-4 w-4 rounded-full border-2 {selectedPlan === 'pro' ? 'border-primary bg-primary' : 'border-muted'}"></div>
						</div>
					</Card.Root>
				</div>

				<!-- Submit Button -->
				<div class="flex justify-center mt-8">
					<Button size="lg" class="px-8" onclick={handlePlanSelection}>
						Continue to {selectedPlan === 'pro' ? 'Payment' : 'Setup'}
					</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div> 