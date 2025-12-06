<script lang="ts">
	import { ListStore } from '$lib/stores/ListStore.svelte';

	const listStore = new ListStore();
</script>

<main class="flex grow flex-col items-center justify-start gap-4">
	<div class="w-[900px] flex flex-col items-center gap-8">
		<button
			onclick={listStore.startStream}
			class="bg-primary text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
			disabled={listStore.isLoading}
		>
			{#if listStore.isLoading}
				<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
			{/if}
			Start stream</button
		>

		<div class="flex flex-col gap-2">
			{#each listStore.formattedMessages as message}
				{#if message.role === 'assistant'}
					{#each message.parts as part}
						{#if part.type === 'tool-result'}
							<p class="text-center text-lg text-neutral-500">
								{part.toolCallId}
							</p>
						{/if}
						{#if part.type === 'text'}
							<p class="text-lg text-neutral-300 prose prose-invert">
								{@html part.content}
							</p>
						{/if}
					{/each}
				{/if}
				<div class="flex flex-col items-center justify-center gap-2"></div>
			{/each}
		</div>
	</div>
</main>
