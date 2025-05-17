<script lang="ts">
	import Building2 from '@lucide/svelte/icons/building-2';
	import Settings from '@lucide/svelte/icons/settings';
	import Mail from '@lucide/svelte/icons/mail';
	import Users2 from '@lucide/svelte/icons/users-2';
	import Briefcase from '@lucide/svelte/icons/briefcase';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { goto } from '$app/navigation';
	import type { Client } from '$lib/types/client';

	let {
		client
	}: {client: Client} = $props();

	const sidebar = useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							{#if client.avatar}
								<Avatar.Image src={client.avatar} alt={client.companyName} />
							{:else}
								<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Building2 class="size-4" />
								</div>
							{/if}
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{client.companyName}</span>
							<span class="truncate text-xs">Pro</span>
						</div>
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<div class="px-2 py-2.5">
					<div class="mb-2 flex items-center gap-2">
						<Avatar.Root class="h-10 w-10 rounded-lg">
							{#if client.avatar}
								<Avatar.Image src={client.avatar} alt={client.companyName} />
							{:else}
								<div class="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Building2 class="size-5" />
								</div>
							{/if}
						</Avatar.Root>
						<div>
							<h3 class="font-semibold">{client.companyName}</h3>
							<p class="text-xs text-muted-foreground">Pro</p>
						</div>
					</div>
					<div class="space-y-1.5">
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<Mail class="size-4" />
							<span class="truncate">{client.email}</span>
						</div>
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<Users2 class="size-4" />
							<span>{client.companySize} employees</span>
						</div>
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<Briefcase class="size-4" />
							<span>{client.industry}</span>
						</div>
					</div>
				</div>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item onclick={() => goto('/dashboard/settings/organization')} class="cursor-pointer">
						<Settings class="size-4" />
						Organization Settings
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu> 