<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import { getChristmasListStore } from '$lib/stores/ChristmasList.svelte';

	const christmasListStore = getChristmasListStore();

	$inspect(christmasListStore.list);
</script>

<main class="flex grow flex-col items-center justify-center gap-4">
	<ul>
		{#each christmasListStore.list as item}
			<li>
				<h3>{item.name}</h3>
				<p>{item.description}</p>
				<p>{item.price}</p>
				<button onclick={() => christmasListStore.removeFromList(item.key)}>Remove</button>
			</li>
		{/each}
	</ul>
</main>
