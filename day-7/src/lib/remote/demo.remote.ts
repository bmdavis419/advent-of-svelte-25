import { getRequestEvent, query } from '$app/server';
import * as Resource from '@effect/opentelemetry/Resource';
import * as Tracer from '@effect/opentelemetry/Tracer';
import { Duration, Effect, Layer, ManagedRuntime, Random } from 'effect';

const TracingLive = Tracer.layerGlobal.pipe(
	Layer.provide(Resource.layer({ serviceName: 'effect-land' }))
);

const runtime = ManagedRuntime.make(TracingLive);

const getRandomNumbers = Effect.gen(function* () {
	const numbers: number[] = [];

	for (let i = 0; i < 100; i++) {
		const number = yield* Random.nextIntBetween(0, 100);
		numbers.push(number);
		yield* Effect.sleep(Duration.millis(10));
	}

	return numbers;
}).pipe(Effect.withSpan('getRandomNumbers'));

export const remoteDemoFetch = query(async () => {
	const event = getRequestEvent();

	event.tracing.current.updateName('remote.demo.fetch');

	const numbers = await getRandomNumbers.pipe(
		Tracer.withSpanContext(event.tracing.current.spanContext()),
		runtime.runPromise
	);

	const traceId = event.tracing.root.spanContext().traceId;

	return {
		numbers,
		traceId
	};
});
