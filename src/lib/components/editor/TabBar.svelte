<script lang="ts">
	import { tabsStore } from '$lib/stores/tabs.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as ScrollArea from '$lib/components/ui/scroll-area/index.js';
	import { cn } from '$lib/utils.js';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import XIcon from '@lucide/svelte/icons/x';
</script>

<div class="flex items-center border-b bg-muted/30">
	<ScrollArea.Root class="w-0 flex-1 whitespace-nowrap">
		<div class="flex">
			{#each tabsStore.tabs as tab (tab.id)}
				{@const isActive = tab.id === tabsStore.activeId}
				<button
					type="button"
					onclick={() => tabsStore.selectTab(tab.id)}
					class={cn(
						'group flex shrink-0 items-center gap-2 border-r px-3 py-2 text-sm transition-colors',
						isActive
							? 'bg-background text-foreground'
							: 'text-muted-foreground hover:bg-muted/60'
					)}
				>
					<span class="max-w-40 truncate">{tab.title}</span>

					{#if tab.isDirty}
						<span class="size-1.5 shrink-0 rounded-full bg-foreground/50"></span>
					{/if}

					<span
						role="button"
						tabindex={-1}
						aria-label="Close tab"
						onclick={(e) => {
							e.stopPropagation();
							tabsStore.closeTab(tab.id);
						}}
						class="rounded p-0.5 opacity-0 hover:bg-muted-foreground/20 group-hover:opacity-100"
					>
						<XIcon class="size-3.5" />
					</span>
				</button>
			{/each}
		</div>
		<ScrollArea.Scrollbar orientation="horizontal" />
	</ScrollArea.Root>

	<Button
		variant="ghost"
		size="icon-sm"
		class="mx-1 shrink-0"
		aria-label="New tab"
		onclick={() => tabsStore.newTab()}
	>
		<PlusIcon class="size-4" />
	</Button>
</div>