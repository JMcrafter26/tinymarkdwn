<script lang="ts">
	import AppMenubar from '$lib/components/editor/AppMenubar.svelte';
	import TabBar from '$lib/components/editor/TabBar.svelte';
	import SplitView from '$lib/components/editor/SplitView.svelte';
	import { tabsStore } from '$lib/stores/tabs.svelte';

	let wordWrap = $state(false);
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<AppMenubar
		bind:wordWrap
		onNewFile={() => tabsStore.newTab()}
		onCloseTab={() => tabsStore.active && tabsStore.closeTab(tabsStore.active.id)}
	/>

	<TabBar />

	<main class="min-h-0 flex-1">
		<SplitView {wordWrap} />
	</main>
</div>