<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';

	let {
		onNewFile,
		onCloseTab,
		wordWrap = $bindable(false)
	}: {
		onNewFile: () => void;
		onCloseTab: () => void;
		wordWrap?: boolean;
	} = $props();
</script>

<Menubar.Root class="rounded-none border-x-0 border-t-0 px-2">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item onSelect={onNewFile}>
				New File <Menubar.Shortcut>⌘N</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>Open File...</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item disabled>Save <Menubar.Shortcut>⌘S</Menubar.Shortcut></Menubar.Item>
			<Menubar.Item disabled>Save As...</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item onSelect={onCloseTab}>
				Close Tab <Menubar.Shortcut>⌘W</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item disabled>Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut></Menubar.Item>
			<Menubar.Item disabled>Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut></Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item disabled>Cut</Menubar.Item>
			<Menubar.Item disabled>Copy</Menubar.Item>
			<Menubar.Item disabled>Paste</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem bind:checked={wordWrap}>Word Wrap</Menubar.CheckboxItem>
			<Menubar.Separator />
			<Menubar.Item disabled>Toggle Preview</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	<Menubar.Menu>
		<Menubar.Trigger>Help</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item disabled>About</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>