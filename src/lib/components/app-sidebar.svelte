<script lang="ts" module>
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Bot from '@lucide/svelte/icons/bot';
	import ChartPie from '@lucide/svelte/icons/chart-pie';
	import Frame from '@lucide/svelte/icons/frame';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import Map from '@lucide/svelte/icons/map';
	import Send from '@lucide/svelte/icons/send';
	import Settings2 from '@lucide/svelte/icons/settings-2';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';

	const data = {
		// user: {
		// 	name: "shadcn",
		// 	email: "m@example.com",
		// 	avatar: "",
		// },
		navMain: [
			{
				title: 'Playground',
				url: '#',
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: 'History',
						url: '#'
					},
					{
						title: 'Starred',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					}
				]
			},
			{
				title: 'Models',
				url: '#',
				icon: Bot,
				items: [
					{
						title: 'Genesis',
						url: '#'
					},
					{
						title: 'Explorer',
						url: '#'
					},
					{
						title: 'Quantum',
						url: '#'
					}
				]
			},
			{
				title: 'Documentation',
				url: '#',
				icon: BookOpen,
				items: [
					{
						title: 'Introduction',
						url: '#'
					},
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
					{
						title: 'Changelog',
						url: '#'
					}
				]
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings2,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Support',
				url: '#',
				icon: LifeBuoy
			},
			{
				title: 'Feedback',
				url: '#',
				icon: Send
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPie
			},
			{
				name: 'Travel',
				url: '#',
				icon: Map
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from '$lib/components/nav-main.svelte';
	import NavProjects from '$lib/components/nav-projects.svelte';
	import NavSecondary from '$lib/components/nav-secondary.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Command from '@lucide/svelte/icons/command';
	import NavWorkspace from '$lib/components/nav-workspace.svelte';
	import type { ComponentProps } from 'svelte';
	import type { User } from 'better-auth';
	import type { Subscription } from '$lib/types/subscription';
	import type { Client } from '$lib/types/client';

	let {
		ref = $bindable(null),
		user,
		subscription,
		client,
		workspace = {
			name: 'Acme Inc',
			plan: 'Enterprise',
			avatar: '',
			email: 'contact@acmeinc.com',
			size: '50-100',
			industry: 'Technology'
		},
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { 
		user: User, 
		subscription: Subscription, 
		client: Client,
		workspace?: {
			name: string;
			plan: string;
			avatar?: string;
			email: string;
			size: string;
			industry: string;
		}
	} = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<NavWorkspace {client} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser
			user={{
				name: user.name,
				email: user.email,
				avatar: user.image || 'https://api.dicebear.com/9.x/micah/svg?seed=Caleb'
			}}
			subscription={subscription}
		/>
	</Sidebar.Footer>
</Sidebar.Root>
