import type { Tab } from '$lib/types/editor';

function makeId() {
	return crypto.randomUUID();
}

class TabsStore {
	tabs = $state<Tab[]>([]);
	activeId = $state<string | null>(null);

	active = $derived(this.tabs.find((t) => t.id === this.activeId) ?? null);

	newTab(title = 'untitled.md', content = '') {
		const tab: Tab = { id: makeId(), title, content, isDirty: false };
		this.tabs.push(tab);
		this.activeId = tab.id;
		return tab;
	}

	closeTab(id: string) {
		const idx = this.tabs.findIndex((t) => t.id === id);
		if (idx === -1) return;

		this.tabs.splice(idx, 1);

		if (this.activeId === id) {
			const fallback = this.tabs[idx] ?? this.tabs[idx - 1];
			this.activeId = fallback?.id ?? null;
		}
	}

	selectTab(id: string) {
		this.activeId = id;
	}

	updateContent(id: string, content: string) {
		const tab = this.tabs.find((t) => t.id === id);
		if (!tab) return;
		tab.content = content;
		tab.isDirty = true;
	}

	markSaved(id: string) {
		const tab = this.tabs.find((t) => t.id === id);
		if (tab) tab.isDirty = false;
	}
}

export const tabsStore = new TabsStore();

// seed with one tab so the app never opens empty
if (tabsStore.tabs.length === 0) {
	tabsStore.newTab('welcome.md', '# Hello\n\nStart typing markdown on the left.');
}