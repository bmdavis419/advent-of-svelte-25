<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import AppError from '$lib/components/AppError.svelte';
	import { remoteDemoFetch } from '$lib/remote/demo.remote';
	import { ListStore } from '$lib/stores/ListStore.svelte';

	const listStore = new ListStore();
</script>

<main class="flex grow flex-col items-center justify-start gap-4">
	<div class="flex flex-row items-center justify-center gap-2">
		<img src={logo} alt="Logo" class="h-24 w-24" />
		<h2 class="text-3xl font-bold"><span class="text-primary">SvelteKit</span> App</h2>
	</div>
	<div class="w-[800px] flex flex-row items-between justify-between gap-2">
		<div class="w-1/2 flex flex-col items-center gap-8">
			<h2 class="text-2xl font-bold">List demo...</h2>
			{#if listStore.isLoading}
				<div class="flex flex-col items-center justify-center gap-2">
					<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
					<p class="text-center text-lg text-neutral-500">Loading...</p>
				</div>
			{/if}
			<button
				onclick={listStore.startStream}
				class="bg-primary text-white px-4 py-2 rounded-md"
				disabled={listStore.isLoading}>Start stream</button
			>
		</div>
		<div class="w-1/2 flex flex-col items-center justify-center">
			<svelte:boundary>
				{#snippet failed(error, retry)}
					<AppError {error} {retry} />
				{/snippet}

				{#snippet pending()}
					<div class="flex flex-col items-center justify-center gap-2">
						<div
							class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"
						></div>
						<p class="text-center text-lg text-neutral-500">Loading...</p>
					</div>
				{/snippet}

				{@const result = await remoteDemoFetch()}

				<p class="text-center text-lg text-neutral-500">Trace ID: {result.traceId}</p>
				<div class="flex flex-col items-center justify-center gap-2">
					{#each result.numbers as num}
						<p class="text-center text-lg text-neutral-500">Number: {num}</p>
					{/each}
				</div>
			</svelte:boundary>
		</div>
	</div>
</main>
