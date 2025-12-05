import { getRequestEvent, query } from '$app/server';
import { trace } from '@opentelemetry/api';
import { error } from '@sveltejs/kit';

const tracer = trace.getTracer('demo.remote');

const fakeLongFunction = async () => {
	return tracer.startActiveSpan('fakeLongFunction', async (span) => {
		const numbers: number[] = [];

		for (let i = 0; i < 100; i++) {
			numbers.push(Math.random());
			await new Promise((resolve) => setTimeout(resolve, 10));
			// if (i === 50) {
			// 	throw new Error('Oops, something went wrong');
			// }
		}

		span.setAttribute('numbers.count', numbers.length);
		span.end();
		return numbers;
	});
};

export const remoteDemoFetch = query(async () => {
	const event = getRequestEvent();

	const traceId = event.tracing.root.spanContext().traceId;

	try {
		const numbers = await fakeLongFunction();

		return {
			traceId,
			numbers
		};
	} catch (err) {
		if (err instanceof Error) {
			event.tracing.current.recordException(err);

			return error(500, {
				message: err.message,
				traceId
			});
		}

		return error(500, {
			message: 'Unknown error',
			traceId
		});
	}
});
