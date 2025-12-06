import { CLAUDE_API_KEY } from '$env/static/private';
import { chat } from '@tanstack/ai';
import { getUserAccomplishmentsDef, getUserDef, getUserPunishmentDef } from './tool-defs';
import { createAnthropic } from '@tanstack/ai-anthropic';
import type { Span } from '@opentelemetry/api';

const adapter = createAnthropic(CLAUDE_API_KEY, {});

const getUserPunishmentServer = getUserPunishmentDef.server(async ({ userId }) => {
	if (userId === '1234') {
		return {
			status: 'success',
			data: {
				punishment: 'Make a video about unit testing'
			}
		};
	}
	return {
		status: 'error',
		data: {
			message: 'User not found'
		}
	};
});

const getUserServer = getUserDef.server(({ userId }) => {
	if (userId === '1234') {
		return {
			status: 'success',
			data: {
				name: 'Ben Davis',
				id: '1234',
				email: 'ben@example.com'
			}
		};
	}
	return {
		status: 'error',
		data: {
			message: 'User not found'
		}
	};
});

const getUserAccomplishmentsServer = getUserAccomplishmentsDef.server(async ({ userId }) => {
	if (userId === '1234') {
		return {
			status: 'success',
			data: {
				accomplishments: [
					'Made a lot of svelte videos',
					'Rebuilt one of Theo`s projects in sveltekit',
					'Made a video about tanstack start and react'
				]
			}
		};
	}
	return {
		status: 'error',
		data: {
			message: 'User not found'
		}
	};
});

const USER_NAUGHTY_LIST_PROMPT = `
You are an internal agent who's job is to determine if a given user is on the naughty or nice list (in 2025). You will be given a user id and you will need to use the tools provided to determine if the user is on the naughty or nice list.

MAKE SURE YOU PASS THE USER ID TO THE TOOLS

A user is on the nice list if all of their accomplishments this year involve svelte or sveltekit. If they do anything involving react or some other framework, they are on the naughty list.

If they are on the naughty list, check what punishment they should receive.

Return a markdown formatted response that includes the user's info, a list of their accomplishments this year, and whether they are on the naughty or nice list and why, and finally the punishment they should receive if they are on the naughty list. Make sure the punishment is formatted to be large and bold at the bottom of the response.

Be friendly and tongue and cheek in your response, this is for a demo and meant to be fun and lighthearted.
`;

export const userNaughtyOrNiceList = (args: {
	userId: string;
	conversationId: string;
	span: Span;
}) => {
	const { userId, conversationId, span } = args;

	span.setAttribute('userId', userId);
	span.setAttribute('conversationId', conversationId);

	const stream = chat({
		adapter,
		model: 'claude-haiku-4-5',
		conversationId,
		tools: [getUserServer, getUserAccomplishmentsServer, getUserPunishmentServer],
		systemPrompts: [USER_NAUGHTY_LIST_PROMPT],
		messages: [
			{
				role: 'user',
				content: `Check if the user with id "${userId}" is on the naughty or nice list. Use this exact userId: ${userId}`
			}
		]
	});

	async function* wrapStream() {
		for await (const chunk of stream) {
			yield chunk;

			// const randomNumber = Math.random();

			// if (randomNumber > 0.7) {
			// 	const err = new Error(
			// 		`nope we're done here. sorry. trace id: ${span.spanContext().traceId}`
			// 	);
			// 	span.recordException(err);
			// 	span.end();
			// 	throw err;
			// }

			if (chunk.type === 'done' && chunk.usage) {
				span.setAttribute('usage.promptTokens', chunk.usage.promptTokens);
				span.setAttribute('usage.completionTokens', chunk.usage.completionTokens);
				span.setAttribute('usage.totalTokens', chunk.usage.totalTokens);
				console.log('=== Turn Completed ===');
				console.log('Token Usage:', {
					promptTokens: chunk.usage.promptTokens,
					completionTokens: chunk.usage.completionTokens,
					totalTokens: chunk.usage.totalTokens
				});
				console.log('======================');
			}
		}
		console.log('=== Stream Completed ===');
		span.end();
	}

	return wrapStream();
};
