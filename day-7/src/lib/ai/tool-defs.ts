import { toolDefinition } from '@tanstack/ai';
import { clientTools } from '@tanstack/ai-client';
import z from 'zod';

export const getUserDef = toolDefinition({
	name: 'get_user',
	description: 'Get the user info by their id',
	inputSchema: z.object({
		userId: z.string().describe('The id of the user to get')
	}),
	outputSchema: z.discriminatedUnion('status', [
		z.object({
			status: z.literal('success'),
			data: z.object({
				name: z.string(),
				id: z.string(),
				email: z.string()
			})
		}),
		z.object({
			status: z.literal('error'),
			data: z.object({
				message: z.string()
			})
		})
	])
});

export const getUserUserAccomplishmentsDef = toolDefinition({
	name: 'get_user_accomplishments',
	description: "Get the user's accomplishments this year by their id",
	inputSchema: z.object({
		userId: z.string().describe('The id of the user to get the accomplishments of')
	}),
	outputSchema: z.discriminatedUnion('status', [
		z.object({
			status: z.literal('success'),
			data: z.object({
				accomplishments: z.array(z.string()).describe('The accomplishments of the user this year')
			})
		}),
		z.object({
			status: z.literal('error'),
			data: z.object({
				message: z.string()
			})
		})
	])
});

export const clientToolDefList = clientTools(
	getUserDef.client(),
	getUserUserAccomplishmentsDef.client()
);
