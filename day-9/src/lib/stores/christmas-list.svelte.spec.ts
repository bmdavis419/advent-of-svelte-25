import { expect, test } from 'vitest';
import { ChristmasListStore } from './ChristmasList.svelte';

test('Adding an item to empty christmas list', () => {
	const christmasListStore = new ChristmasListStore({ includeDefaultList: false });

	expect(christmasListStore.list.length).toEqual(0);

	const fakeItem = {
		id: 1,
		name: 'Test Item',
		description: 'Test Description',
		price: 100
	};

	const key = christmasListStore.addToList(fakeItem);

	expect(christmasListStore.list).toEqual([{ ...fakeItem, key }]);
});

test('Adding an item to non-empty christmas list', () => {
	const christmasListStore = new ChristmasListStore({ includeDefaultList: false });

	expect(christmasListStore.list.length).toEqual(0);

	christmasListStore.addToList({
		id: 1,
		name: 'Test Item',
		description: 'Test Description',
		price: 100
	});

	expect(christmasListStore.list.length).toEqual(1);

	christmasListStore.addToList({
		id: 2,
		name: 'Test Item 2',
		description: 'Test Description 2',
		price: 200
	});

	expect(christmasListStore.list.length).toEqual(2);
});

test('Getting an item from empty christmas list', () => {
	const christmasListStore = new ChristmasListStore({ includeDefaultList: false });

	expect(christmasListStore.list.length).toEqual(0);

	const item = christmasListStore.getItemFromList('1');

	expect(item).toEqual(null);
});

test('Getting an item from non-empty christmas list', () => {
	const christmasListStore = new ChristmasListStore({ includeDefaultList: false });

	expect(christmasListStore.list.length).toEqual(0);

	const key = christmasListStore.addToList({
		id: 1,
		name: 'Test Item',
		description: 'Test Description',
		price: 100
	});

	const item = christmasListStore.getItemFromList(key);

	expect(item).toEqual({
		id: 1,
		name: 'Test Item',
		description: 'Test Description',
		price: 100
	});
});

test('Removing an item from full christmas list', () => {
	const christmasListStore = new ChristmasListStore({ includeDefaultList: false });

	christmasListStore.addToList({
		id: 1,
		name: 'Test Item',
		description: 'Test Description',
		price: 100
	});

	christmasListStore.addToList({
		id: 2,
		name: 'Test Item 2',
		description: 'Test Description 2',
		price: 200
	});

	const key = christmasListStore.addToList({
		id: 3,
		name: 'Test Item 3',
		description: 'Test Description 3',
		price: 300
	});

	christmasListStore.addToList({
		id: 4,
		name: 'Test Item 4',
		description: 'Test Description 4',
		price: 400
	});

	christmasListStore.addToList({
		id: 5,
		name: 'Test Item 5',
		description: 'Test Description 5',
		price: 320
	});

	christmasListStore.removeFromList(key);

	expect(christmasListStore.list.length).toEqual(4);

	const item = christmasListStore.getItemFromList(key);

	expect(item).toEqual(null);
});

test('Removing an item from empty christmas list', () => {
	const christmasListStore = new ChristmasListStore({ includeDefaultList: false });

	expect(christmasListStore.list.length).toEqual(0);

	christmasListStore.removeFromList('1');

	expect(christmasListStore.list.length).toEqual(0);
});
