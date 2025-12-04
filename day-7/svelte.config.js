import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		experimental: {
			tracing: {
				server: true
			}, 
			instrumentation: {
				server: true
			},
			remoteFunctions: true
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;
