<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import EditorPane from './EditorPane.svelte';
	import PreviewPane from './PreviewPane.svelte';

	let { wordWrap = false }: { wordWrap?: boolean } = $props();
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full">
	<Resizable.Pane defaultSize={50} minSize={20}>
		<EditorPane {wordWrap} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50} minSize={20}>
		<PreviewPane />
	</Resizable.Pane>
</Resizable.PaneGroup>