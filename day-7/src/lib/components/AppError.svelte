<script lang="ts">
	import { isHttpError } from '@sveltejs/kit';

	let {
		error,
		retry
	}: {
		error: unknown;
		retry?: () => void;
	} = $props();

	const parsedError = $derived.by(() => {
		if (isHttpError(error)) {
			return {
				status: error.status,
				message: error.body.message,
				traceId: error.body.traceId
			};
		}

		return {
			status: 500,
			message: 'Unknown error',
			traceId: undefined
		};
	});
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="text-2xl font-bold">Error {parsedError.status}</h1>
	<p class="text-sm text-gray-500">{parsedError.message}</p>
	<p class="text-sm text-gray-500">{parsedError.traceId ?? 'No trace ID'}</p>
	{#if retry}
		<button class="bg-primary text-white px-4 py-2 rounded-md" onclick={retry}>Retry</button>
	{/if}
</div>
