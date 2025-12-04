<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import { remoteDemoFetch } from '$lib/remote/demo.remote';

	const demoResult = await remoteDemoFetch();
</script>

<main class="flex grow flex-col items-center justify-center gap-4">
	<div class="flex flex-row items-center justify-center gap-2">
		<img src={logo} alt="Logo" class="h-24 w-24" />
		<h2 class="text-3xl font-bold"><span class="text-primary">SvelteKit</span> App</h2>
	</div>
	<div class="flex flex-col items-center justify-center gap-2">
		{#each demoResult.numbers as num}
			<p class="text-center text-lg text-neutral-500">Number: {num}</p>
		{/each}
	</div>
</main>
