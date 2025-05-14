<script lang="ts">
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import ModeToggle from "$lib/components/mode-toggle.svelte";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

    let { children, data } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar user={data.user}/>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
                <ModeToggle class="-ml-2" />
                <Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
						<!-- <Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
						</Breadcrumb.Item> -->
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
        <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
            {@render children()}
        </main>
	</Sidebar.Inset>
</Sidebar.Provider>