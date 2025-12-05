import { OPENROUTER_API_KEY } from '$env/static/private';
import { chat } from '@tanstack/ai';
import { createOpenAI } from '@tanstack/ai-openai';

const adapter = createOpenAI(OPENROUTER_API_KEY, { baseURL: 'https://openrouter.ai/api/v1' });

export const demoPrompt = () => {
	return chat({
		adapter,
		model: 'gpt-4.1',
		messages: [
			{
				role: 'user',
				content: 'Hello, how are you?'
			}
		]
	});
};
