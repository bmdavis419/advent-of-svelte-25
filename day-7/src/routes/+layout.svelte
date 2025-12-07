<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Christmas List Generator</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="flex min-h-screen flex-col items-center justify-between text-slate-100 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black font-sans selection:bg-red-500/30"
>
	<header
		class="w-full py-6 flex justify-center items-center border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/20"
	>
		<div class="flex items-center gap-3 group cursor-default">
			<span class="text-4xl transform group-hover:rotate-12 transition-transform duration-300"
				>🎄</span
			>
			<h1
				class="text-3xl font-serif font-bold bg-linear-to-r from-red-400 via-red-100 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-sm"
			>
				Advent of Svelte
			</h1>
			<span class="text-4xl transform group-hover:-rotate-12 transition-transform duration-300"
				>🎁</span
			>
		</div>
	</header>

	{@render children?.()}

	<footer class="py-8 text-slate-500 text-sm font-medium flex items-center gap-2"></footer>
</div>
