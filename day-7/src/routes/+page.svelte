<script lang="ts">
	import { ListStore } from '$lib/stores/ListStore.svelte';

	const listStore = new ListStore();
</script>

<main class="flex grow flex-col items-center justify-start gap-8 w-full max-w-5xl px-4 py-12">
	<div class="w-full flex flex-col items-center gap-10">
		<!-- Hero / Action Section -->
		<div class="flex flex-col items-center gap-6 text-center">
			<h2 class="text-2xl text-slate-300 font-light italic max-w-lg leading-relaxed">
				"Checking the list twice..."
			</h2>

			<button
				onclick={listStore.startStream}
				class="relative group overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
				disabled={listStore.isLoading}
			>
				<span
					class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ef4444_0%,#10b981_50%,#ef4444_100%)]"
				></span>
				<span
					class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-lg font-bold text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900/90 gap-3"
				>
					{#if listStore.isLoading}
						<div
							class="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent"
						></div>
						<span class="bg-linear-to-r from-red-200 to-red-100 bg-clip-text text-transparent"
							>Generating...</span
						>
					{:else}
						<span class="text-xl">✨</span>
						<span class="bg-linear-to-r from-red-400 to-red-200 bg-clip-text text-transparent"
							>Start Stream</span
						>
					{/if}
				</span>
			</button>
		</div>

		<!-- Content Area -->
		<div class="flex flex-col gap-8 w-full">
			{#each listStore.formattedMessages as message}
				{#if message.role === 'assistant'}
					<!-- Message Card -->
					<div
						class="group relative w-full transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
					>
						<!-- Decorative Glow -->
						<div
							class="absolute -inset-1 bg-linear-to-r from-red-600/20 via-green-600/20 to-red-600/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
						></div>

						<div
							class="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl"
						>
							{#each message.parts as part}
								{#if part.type === 'tool-result'}
									<div
										class="items-center gap-3 text-xs md:text-sm text-emerald-400/70 font-mono mb-6 bg-emerald-950/30 border border-emerald-500/20 px-4 py-2 rounded-full self-start inline-flex max-w-full overflow-hidden"
									>
										<span class="shrink-0">🔧</span>
										<span class="truncate opacity-80">Processing: {part.toolCallId}</span>
									</div>
								{/if}
								{#if part.type === 'text'}
									<div
										class="prose prose-invert prose-lg md:prose-xl max-w-none
										prose-headings:font-serif prose-headings:text-red-200
										prose-p:text-slate-300 prose-p:leading-relaxed
										prose-a:text-red-400 hover:prose-a:text-red-300 prose-a:no-underline prose-a:border-b prose-a:border-red-500/50 hover:prose-a:border-red-400
										prose-strong:text-white prose-strong:font-bold
										prose-ul:list-disc prose-ul:marker:text-green-500
										prose-li:marker:text-green-500"
									>
										{@html part.content}
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</main>
