import { userNaughtyOrNiceList } from '$lib/ai';
import { trace } from '@opentelemetry/api';
import { toStreamResponse } from '@tanstack/ai';

export const POST = async ({ params, request, tracing }) => {
	const { userId } = params;

	const traceId = tracing.root.spanContext().traceId;

	console.log('list agent called', traceId);

	const body = await request.json();

	const conversationId = body.data.conversationId ?? crypto.randomUUID();

	const tracer = trace.getTracer('naughty-or-nice-list-agent-run');

	const stream = tracer.startActiveSpan('naughty-or-nice-list-agent-run', (span) => {
		return userNaughtyOrNiceList({ userId, conversationId, span });
	});

	return toStreamResponse(stream);
};
