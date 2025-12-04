import { getRequestEvent, query } from '$app/server';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('demo.remote');

const fakeLongFunction = async () => {
    return tracer.startActiveSpan('fakeLongFunction', async (span) => {
        const numbers: number[] = [];

        for (let i = 0; i < 100; i++) {
            numbers.push(Math.random());
            await new Promise((resolve) => setTimeout(resolve, 10));
        }

        span.setAttribute('numbers.count', numbers.length);
        span.end();
        return numbers;
    });
}

export const remoteDemoFetch = query(async () => {
    const event = getRequestEvent()

    event.tracing.current.updateName('remote.demo.fetch');

    const numbers = await fakeLongFunction()

	return {
        numbers
    };
});
