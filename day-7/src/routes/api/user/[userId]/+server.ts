import { demoPrompt } from '$lib/ai';
import { toStreamResponse } from '@tanstack/ai';

export const POST = async ({ params, request }) => {
	const { userId } = params;

	const stream = demoPrompt();

	return toStreamResponse(stream);
};
