<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="space-y-6 p-5 pb-16">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">
			Manage your account settings and preferences.
		</p>
	</div>

	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
				<a
					href="/dashboard/settings/account"
					class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground {$page.url.pathname === '/dashboard/settings/account' ? 'bg-accent' : ''}"
				>
					Account
				</a>
				<a
					href="/dashboard/settings/membership"
					class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground {$page.url.pathname === '/dashboard/settings/membership' ? 'bg-accent' : ''}"
				>
					Membership
				</a>
				<a
					href="/dashboard/settings/organization"
					class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground {$page.url.pathname === '/dashboard/settings/organization' ? 'bg-accent' : ''}"
				>
					Organization
				</a>
			</nav>
		</aside>
		<div class="flex-1">
			<slot />
		</div>
	</div>
</div> 