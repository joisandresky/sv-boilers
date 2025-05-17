<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Card } from '$lib/components/ui/card';

	const session = authClient.useSession();

	const pricingPlans = [
		{
			name: 'Free',
			price: 0,
			features: [
				'1 service/location',
				'100 feedbacks per month',
				'Basic sentiment analysis',
				'NPS tracking',
				'Unique feedback URLs',
				'Basic survey builder',
				'CSV data import'
			]
		},
		{
			name: 'Pro',
			price: 19,
			features: [
				'Unlimited services/locations',
				'Unlimited feedbacks',
				'Advanced AI analysis',
				'Custom categories & tags',
				'QR code generation',
				'Advanced survey builder',
				'Bulk CSV import',
				'Priority support'
			]
		}
	];

	let isMenuOpen = false;
</script>

<!-- Navigation -->
<nav
	class="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="text-xl font-bold"> Reflectify </a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-8">
				<a href="#features" class="text-foreground/60 hover:text-foreground">Features</a>
				<a href="#pricing" class="text-foreground/60 hover:text-foreground">Pricing</a>
			</div>

			<!-- Auth Buttons -->
			<div class="hidden md:flex md:items-center md:space-x-4">
				{#if $session.data}
					<Button variant="ghost" href="/dashboard">Dashboard</Button>
					<Button variant="outline" onclick={async () => await authClient.signOut()}>
						Sign Out
					</Button>
				{:else}
					<Button variant="ghost" href="/login">Sign In</Button>
					<Button href="/register">Get Started</Button>
				{/if}
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<Button variant="ghost" size="icon" onclick={() => (isMenuOpen = !isMenuOpen)}>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						{#if isMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</Button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<a href="#features" class="block px-3 py-2 text-foreground/60 hover:text-foreground"
					>Features</a
				>
				<a href="#pricing" class="block px-3 py-2 text-foreground/60 hover:text-foreground"
					>Pricing</a
				>
				{#if $session.data}
					<Button variant="ghost" href="/dashboard" class="w-full justify-start">Dashboard</Button>
					<Button
						variant="outline"
						onclick={async () => await authClient.signOut()}
						class="w-full justify-start"
					>
						Sign Out
					</Button>
				{:else}
					<Button variant="ghost" href="/login" class="w-full justify-start">Sign In</Button>
					<Button href="/register" class="w-full justify-start">Get Started</Button>
				{/if}
			</div>
		</div>
	{/if}
</nav>

<!-- Hero Section -->
<section
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 pt-16 text-center"
>
	<div class="mx-auto max-w-3xl">
		<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
			Turn Product Feedback into
			<span class="text-primary">Growth Opportunities</span>
		</h1>
		<p class="mt-6 text-xl text-muted-foreground">
			Make better product decisions with AI-powered feedback analysis. Understand user sentiment,
			track NPS, and prioritize features that matter.
		</p>
		<div class="mt-10 flex justify-center">
			{#if $session.data}
				<Button size="lg" href="/dashboard">Go to Dashboard</Button>
			{:else}
				<Button size="lg" href="/register">Start Free Trial</Button>
			{/if}
		</div>
		<div class="mt-8 text-sm text-muted-foreground">Start free • No credit card required</div>
	</div>
</section>

<!-- Features Section -->
<section class="bg-secondary/20 px-4 py-24" id="features">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-12 text-center text-3xl font-bold">Everything You Need for Feedback Analysis</h2>
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">AI-Powered Analysis</h3>
				<p class="mb-4 text-muted-foreground">
					Get instant sentiment analysis and insights from your customer feedback.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Sentiment detection
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Key topic extraction
					</li>
				</ul>
			</div>

			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Multi-Service Management</h3>
				<p class="mb-4 text-muted-foreground">
					Manage feedback for multiple locations or services from one dashboard.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Branch/location tracking
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Service-specific insights
					</li>
				</ul>
			</div>

			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Easy Sharing</h3>
				<p class="mb-4 text-muted-foreground">
					Share feedback forms and surveys with unique URLs and QR codes.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Custom URLs
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						QR code generation
					</li>
				</ul>
			</div>

			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Survey Builder</h3>
				<p class="mb-4 text-muted-foreground">
					Create and distribute custom surveys to gather targeted feedback.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Custom questions
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Multiple formats
					</li>
				</ul>
			</div>

			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Smart Analytics</h3>
				<p class="mb-4 text-muted-foreground">
					Track trends and patterns across all your services.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Cross-service insights
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Performance comparison
					</li>
				</ul>
			</div>

			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Data Import</h3>
				<p class="mb-4 text-muted-foreground">Import existing feedback data from CSV files.</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						CSV file support
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Bulk data processing
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="bg-background px-4 py-24">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-16 text-center text-3xl font-bold">How Reflectify Works</h2>
		<div class="grid gap-8 md:grid-cols-4">
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
				>
					<span class="text-2xl font-bold text-primary">1</span>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Setup</h3>
				<p class="text-muted-foreground">Create your services and customize feedback forms</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
				>
					<span class="text-2xl font-bold text-primary">2</span>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Share</h3>
				<p class="text-muted-foreground">Distribute unique URLs and QR codes to customers</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
				>
					<span class="text-2xl font-bold text-primary">3</span>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Collect</h3>
				<p class="text-muted-foreground">Gather feedback and survey responses automatically</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
				>
					<span class="text-2xl font-bold text-primary">4</span>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Analyze</h3>
				<p class="text-muted-foreground">Get AI-powered insights across all your services</p>
			</div>
		</div>
	</div>
</section>

<!-- Use Cases Section -->
<section class="bg-secondary/20 px-4 py-24">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-16 text-center text-3xl font-bold">Perfect for Product Decision Making</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Feature Prioritization</h3>
				<p class="mb-4 text-muted-foreground">
					Identify which features your users need most based on feedback analysis.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Impact analysis
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						User demand tracking
					</li>
				</ul>
			</div>
			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">User Sentiment</h3>
				<p class="mb-4 text-muted-foreground">
					Track how users feel about your product and features.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Sentiment trends
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Feature satisfaction
					</li>
				</ul>
			</div>
			<div class="rounded-lg bg-background p-6 shadow-sm">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Growth Insights</h3>
				<p class="mb-4 text-muted-foreground">
					Track NPS and identify opportunities for product growth.
				</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						NPS analysis
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-primary"
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
						Growth opportunities
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section class="bg-background px-4 py-24" id="pricing">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-12 text-center text-3xl font-bold">Simple, Transparent Pricing</h2>
		<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
			{#each pricingPlans as plan}
				<Card class="flex flex-col p-6">
					<div class="flex-1">
						<h3 class="text-2xl font-bold">{plan.name}</h3>
						<div class="mt-4">
							<span class="text-4xl font-bold">${plan.price}</span>
							<span class="text-muted-foreground">/month</span>
						</div>
						<ul class="mt-6 space-y-4">
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
					</div>
					<Button class="mt-8 w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
						{plan.name === 'Free' ? 'Get Started' : 'Upgrade to Pro'}
					</Button>
				</Card>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-background px-4 py-12">
	<div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
		<div>
			<h3 class="mb-4 font-bold">Product</h3>
			<ul class="space-y-2">
				<li><a href="#features" class="text-muted-foreground hover:text-primary">Features</a></li>
				<li><a href="#pricing" class="text-muted-foreground hover:text-primary">Pricing</a></li>
				<li><a href="/docs" class="text-muted-foreground hover:text-primary">Documentation</a></li>
			</ul>
		</div>
		<div>
			<h3 class="mb-4 font-bold">Resources</h3>
			<ul class="space-y-2">
				<li>
					<a href="/docs/api" class="text-muted-foreground hover:text-primary">API Reference</a>
				</li>
				<li><a href="/docs/sdk" class="text-muted-foreground hover:text-primary">SDK Guide</a></li>
				<li>
					<a href="/docs/webhooks" class="text-muted-foreground hover:text-primary">Webhooks</a>
				</li>
			</ul>
		</div>
		<div>
			<h3 class="mb-4 font-bold">Legal</h3>
			<ul class="space-y-2">
				<li>
					<a href="/privacy" class="text-muted-foreground hover:text-primary">Privacy Policy</a>
				</li>
				<li>
					<a href="/terms" class="text-muted-foreground hover:text-primary">Terms of Service</a>
				</li>
				<li><a href="/security" class="text-muted-foreground hover:text-primary">Security</a></li>
			</ul>
		</div>
		<div>
			<h3 class="mb-4 font-bold">Company</h3>
			<ul class="space-y-2">
				<li><a href="/about" class="text-muted-foreground hover:text-primary">About</a></li>
				<li><a href="/blog" class="text-muted-foreground hover:text-primary">Blog</a></li>
				<li><a href="/contact" class="text-muted-foreground hover:text-primary">Contact</a></li>
			</ul>
		</div>
	</div>
	<div class="mt-12 text-center text-muted-foreground">
		<p>© {new Date().getFullYear()} FeedbackAI. All rights reserved.</p>
	</div>
</footer>
