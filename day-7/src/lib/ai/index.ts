import { OPENROUTER_API_KEY } from '$env/static/private';
import { chat } from '@tanstack/ai';
import { createOpenAI } from '@tanstack/ai-openai';
import { getUserDef, getUserUserAccomplishmentsDef } from './tool-defs';

const adapter = createOpenAI(OPENROUTER_API_KEY, { baseURL: 'https://openrouter.ai/api/v1' });

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

const getUserUserAccomplishmentsServer = getUserUserAccomplishmentsDef.server(
	async ({ userId }) => {
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
	}
);

const USER_NAUGHTY_LIST_PROMPT = `
You are an internal agent who's job is to determine if a given user is on the naughty or nice list. You will be given a user id and you will need to use the tools provided to determine if the user is on the naughty or nice list.

MAKE SURE YOU PASS THE USER ID TO THE TOOLS

Before you use the tools, first output the user id that you got and will be passing to the tools.

A user is on the nice list if all of their accomplishments this year involve svelte or sveltekit. If they do anything involving react or some other framework, they are on the naughty list.

Return a markdown formatted response that includes the user's info, a list of their accomplishments this year, and whether they are on the naughty or nice list and why.

Be friendly and tongue and cheek in your response, this is for a demo and meant to be fun and lighthearted.
`;

export const userNaughtyOrNiceList = (userId: string, conversationId: string) => {
	console.log('userId', userId);
	return chat({
		adapter,
		model: 'gpt-4o',
		tools: [getUserServer, getUserUserAccomplishmentsServer],
		systemPrompts: [USER_NAUGHTY_LIST_PROMPT],
		messages: [
			{
				role: 'user',
				content: `Check if the user with id "${userId}" is on the naughty or nice list. Use this exact userId: ${userId}`
			}
		]
	});
};
