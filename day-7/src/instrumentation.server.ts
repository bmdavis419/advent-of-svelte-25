import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { createAddHookMessageChannel } from 'import-in-the-middle';
import { register } from 'node:module';
import { env } from '$env/dynamic/private';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

const { registerOptions } = createAddHookMessageChannel();
register('import-in-the-middle/hook.mjs', import.meta.url, registerOptions);

const traceExporter = new OTLPTraceExporter({
	url: 'https://api.axiom.co/v1/traces',
	headers: {
		Authorization: `Bearer ${env.AXIOM_API_TOKEN}`,
		'X-Axiom-Dataset': env.AXIOM_DATASET
	}
});

const sdk = new NodeSDK({
	serviceName: 'day-7-otel',
	spanProcessors: [new BatchSpanProcessor(traceExporter)],
	instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();
