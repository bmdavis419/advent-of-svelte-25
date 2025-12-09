<script lang="ts">
	import { getChristmasListStore } from '$lib/stores/ChristmasList.svelte';

	const christmasListStore = getChristmasListStore();

	let name = $state('');
	let description = $state('');
	let price = $state(0);

	function addItem(e: SubmitEvent) {
		e.preventDefault();
		christmasListStore.addToList({
			id: Date.now(),
			name,
			description,
			price
		});

		// Reset form
		name = '';
		description = '';
		price = 0;
	}
</script>

<main class="w-full max-w-4xl p-6 flex flex-col gap-8">
	<header class="text-center space-y-4">
		<h1 class="text-5xl font-serif text-red-500 drop-shadow-lg">🎄 Christmas List 🎁</h1>
	</header>

	<section
		class="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-700 shadow-xl backdrop-blur-sm"
	>
		<h2 class="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2">✨ Add a Wish</h2>
		<form onsubmit={addItem} class="grid grid-cols-1 md:grid-cols-12 gap-4">
			<div class="md:col-span-8 space-y-2">
				<label for="name" class="block text-sm font-medium text-neutral-300">Item Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					placeholder="Svelte 6"
					class="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white placeholder-neutral-500"
				/>
			</div>

			<div class="md:col-span-4 space-y-2">
				<label for="price" class="block text-sm font-medium text-neutral-300">Price ($)</label>
				<input
					type="number"
					id="price"
					bind:value={price}
					min="0"
					step="0.01"
					required
					class="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white"
				/>
			</div>

			<div class="md:col-span-12 space-y-2">
				<label for="desc" class="block text-sm font-medium text-neutral-300">Description</label>
				<textarea
					id="desc"
					bind:value={description}
					required
					rows="3"
					placeholder="Why do you want this?"
					class="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white placeholder-neutral-500 resize-y"
				></textarea>
			</div>

			<div class="md:col-span-12 flex justify-end">
				<button
					type="submit"
					class="px-8 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-red-900/20 cursor-pointer"
				>
					Add 🎅
				</button>
			</div>
		</form>
	</section>

	<ul class="flex flex-col gap-4">
		{#each christmasListStore.list as item (item.key)}
			<li
				class="group relative bg-neutral-900 text-neutral-200 rounded-xl p-6 shadow-md border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
			>
				<!-- Decorative left border -->
				<div
					class="absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b from-red-500 via-green-500 to-red-500 rounded-l-xl"
				></div>

				<div class="pl-2 flex flex-col md:flex-row gap-4 justify-between items-start">
					<div class="space-y-2 flex-1">
						<div class="flex items-center gap-3 flex-wrap">
							<h3 class="text-xl font-bold text-white">{item.name}</h3>
							<span
								class="bg-green-900/30 text-green-400 text-sm font-bold px-2 py-0.5 rounded border border-green-800/50"
							>
								${item.price}
							</span>
						</div>

						<p class="text-neutral-400 text-base leading-relaxed whitespace-pre-wrap">
							{item.description}
						</p>
					</div>

					<button
						onclick={() => christmasListStore.removeFromList(item.key)}
						class="shrink-0 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors text-sm font-semibold flex items-center gap-2 cursor-pointer self-start md:self-center"
						aria-label="Remove item"
					>
						Remove 🗑️
					</button>
				</div>
			</li>
		{/each}
	</ul>

	{#if christmasListStore.list.length === 0}
		<div
			class="text-center py-12 bg-neutral-900/50 rounded-xl border-2 border-dashed border-neutral-800"
		>
			<p class="text-2xl mb-2">📭</p>
			<p class="text-neutral-500">Your Christmas list is empty!</p>
		</div>
	{/if}
</main>
