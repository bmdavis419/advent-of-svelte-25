import { userNaughtyOrNiceList } from '$lib/ai';
import { toStreamResponse } from '@tanstack/ai';

export const POST = async ({ params, request }) => {
	const { userId } = params;

	const { conversationId } = await request.json();

	const stream = userNaughtyOrNiceList(userId, conversationId);

	return toStreamResponse(stream);
};
