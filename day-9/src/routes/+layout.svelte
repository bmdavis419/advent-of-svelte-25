<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setChristmasListStore } from '$lib/stores/ChristmasList.svelte';

	let { children } = $props();

	setChristmasListStore();
</script>

<svelte:head>
	<title>Christmas List</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-between text-neutral-50 bg-neutral-800">
	{@render children()}
</div>
