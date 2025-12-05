<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import AppError from '$lib/components/AppError.svelte';
	import { remoteDemoFetch } from '$lib/remote/demo.remote';
</script>

<svelte:boundary>
	{#snippet failed(error, retry)}
		<AppError {error} {retry} />
	{/snippet}

	{#snippet pending()}
		<div class="flex flex-col items-center justify-center gap-2">
			<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
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
