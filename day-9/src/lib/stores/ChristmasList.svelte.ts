import { createContext } from 'svelte';

// please do not take this as an example of good code, this is purely for fun

type ListStoreItem = {
	id: number;
	name: string;
	description: string;
	price: number;
};

type InternalBTreeBecauseItsFunnyLeaveMeAlone = {
	left: InternalBTreeBecauseItsFunnyLeaveMeAlone | null;
	right: InternalBTreeBecauseItsFunnyLeaveMeAlone | null;
	// this is the price of the item + the id for sorting and searching purposes
	key: string;
	value: ListStoreItem;
};

const initialList = [
	{
		id: 1,
		name: 'The `rust` remote function',
		description:
			'We all know JS is way too slow, what if we could embed Rust code in a remote function?',
		price: 877
	},
	{
		id: 2,
		name: 'The `$react` rune',
		description:
			'Svelte is great, but honestly I really miss useEffect. What if we could embed react components in Svelte?',
		price: 332
	},
	{
		id: 3,
		name: 'Remove all type safety',
		description:
			"I'm tired of all this complexity bloat. No more types, and ideally the keys on objects would be randomized.",
		price: 991
	},
	{
		id: 4,
		name: 'The `rerenderEverything` helper function',
		description:
			"I kinda feel bad for my CPU. Because of signals we're not constantly re-rendering everything, we should fix that.",
		price: 528
	}
] satisfies ListStoreItem[];

export class ChristmasListStore {
	private internalSearchTree = $state<InternalBTreeBecauseItsFunnyLeaveMeAlone | null>(null);

	private internalSearchTreeToArray = (
		tree: InternalBTreeBecauseItsFunnyLeaveMeAlone | null
	): (ListStoreItem & { key: string })[] => {
		if (tree === null) {
			return [];
		}

		const left = this.internalSearchTreeToArray(tree.left);
		const right = this.internalSearchTreeToArray(tree.right);
		const value = { ...tree.value, key: tree.key };

		return [...left, value, ...right];
	};

	private getKey = (item: ListStoreItem) => {
		// yes, this is completely brain dead. I'm just screwing around for the bit
		const priceWith20Spaces = item.price.toString().padStart(20, '0');
		return `${priceWith20Spaces}-${item.id}`;
	};

	private internalGetItemFromSearchTree = (
		key: string,
		tree: InternalBTreeBecauseItsFunnyLeaveMeAlone | null
	): ListStoreItem | null => {
		const curTree = $state.snapshot(tree);

		if (curTree === null) {
			return null;
		}

		if (key === curTree.key) {
			return curTree.value;
		}

		if (key < curTree.key) {
			return this.internalGetItemFromSearchTree(key, curTree.left);
		}

		return this.internalGetItemFromSearchTree(key, curTree.right);
	};

	private internalRemoveFromSearchTree = (
		key: string,
		tree: InternalBTreeBecauseItsFunnyLeaveMeAlone | null
	): InternalBTreeBecauseItsFunnyLeaveMeAlone | null => {
		const curTree = $state.snapshot(tree);

		if (curTree === null) {
			return null;
		}

		if (key === curTree.key) {
			if (!curTree.left) return curTree.right;
			if (!curTree.right) return curTree.left;

			let minRight = curTree.right;
			while (minRight.left !== null) minRight = minRight.left;

			return {
				left: curTree.left,
				key: minRight.key,
				value: minRight.value,
				right: this.internalRemoveFromSearchTree(minRight.key, curTree.right)
			};
		} else if (key < curTree.key) {
			return {
				...curTree,
				left: this.internalRemoveFromSearchTree(key, curTree.left)
			};
		} else {
			return {
				...curTree,
				right: this.internalRemoveFromSearchTree(key, curTree.right)
			};
		}
	};

	private internalAddToSearchTree = (
		item: ListStoreItem,
		tree: InternalBTreeBecauseItsFunnyLeaveMeAlone | null
	): InternalBTreeBecauseItsFunnyLeaveMeAlone => {
		const key = this.getKey(item);

		const curTree = $state.snapshot(tree);

		if (curTree === null) {
			return {
				left: null,
				right: null,
				key,
				value: item
			};
		}

		if (key < curTree.key) {
			return {
				...curTree,
				left: this.internalAddToSearchTree(item, curTree.left)
			};
		} else {
			return {
				...curTree,
				right: this.internalAddToSearchTree(item, curTree.right)
			};
		}
	};

	list = $derived.by(() => this.internalSearchTreeToArray(this.internalSearchTree));

	addToList = (item: ListStoreItem) => {
		this.internalSearchTree = this.internalAddToSearchTree(item, this.internalSearchTree);
		const key = this.getKey(item);
		return key;
	};

	removeFromList = (key: string) => {
		this.internalSearchTree = this.internalRemoveFromSearchTree(key, this.internalSearchTree);
	};

	getItemFromList = (key: string) => {
		return this.internalGetItemFromSearchTree(key, this.internalSearchTree);
	};

	constructor(args: { includeDefaultList: boolean }) {
		if (args.includeDefaultList) {
			initialList.forEach(this.addToList);
		}
	}
}

const [internalGet, internalSet] = createContext<ChristmasListStore>();

export const setChristmasListStore = () => {
	const store = new ChristmasListStore({ includeDefaultList: true });
	return internalSet(store);
};

export const getChristmasListStore = () => {
	const store = internalGet();
	if (!store) {
		throw new Error('ChristmasListStore not found, make sure you set it in a parent component');
	}
	return store;
};
