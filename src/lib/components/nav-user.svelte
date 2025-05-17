<script lang="ts">
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import Bell from '@lucide/svelte/icons/bell';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import ExternalLink from '@lucide/svelte/icons/external-link';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { generateAvatarInitials } from '$lib/utils';
	import type { Subscription } from '$lib/types/subscription';
	import { polar_products } from '$lib/pricing';

	let {
		user,
		subscription,
	}: {
		user: {
			name: string;
			email: string;
			avatar: string;
		};
		subscription: Subscription;
	} = $props();

	let isLoading = $state(false);

	const sidebar = useSidebar();

	const isProSub = $derived.by(() => {
		const sub = polar_products.find(p => p.productId === subscription.product_id);

		return sub?.slug === 'pro';
	})

	async function onLogout() {
		isLoading = true;
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					isLoading = false;
					goto('/login');
				}
			}
		});
	}

	async function onGoToPolarCustomerPortal() {
		goto('/api/auth/portal');
	}
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
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg"
								>{generateAvatarInitials(user.name)}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg"
								>{generateAvatarInitials(user.name)}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item class={`cursor-pointer ${isProSub ? 'font-bold' : ''}`} onclick={() => goto('/dashboard/settings/membership')}>
						<Sparkles />
						{isProSub ? 'Pro Membership' : 'Upgrade to Pro'}
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item onclick={() => goto('/dashboard/settings/account')}>
						<BadgeCheck />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onclick={onGoToPolarCustomerPortal}
						class="flex cursor-pointer items-center justify-between"
					>
						<div class="flex items-center gap-2">
							<CreditCard />
							Billing
						</div>
						<ExternalLink />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Bell />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={onLogout} class="cursor-pointer">
					<LogOut />
					{#if !isLoading}
						Log out
					{:else}
						Logging out...
					{/if}
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
