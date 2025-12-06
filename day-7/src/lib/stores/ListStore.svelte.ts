import { clientToolDefList } from '$lib/ai/tool-defs';
import { messages } from '@tanstack/ai';
import {
	ChatClient,
	createChatClientOptions,
	fetchServerSentEvents,
	type ChatClientOptions,
	type InferChatMessages
} from '@tanstack/ai-client';
import { marked } from 'marked';

type MyOptions = ChatClientOptions<typeof clientToolDefList>;
type Messages = InferChatMessages<MyOptions>;

export class ListStore {
	userId = $state('1234');
	isLoading = $state(false);
	private messages = $state<Messages>([]);
	formattedMessages = $derived(
		this.messages.map((message) => {
			if (message.role !== 'assistant') return message;

			return {
				...message,
				parts: message.parts.map((part) =>
					part.type === 'text'
						? { ...part, content: marked.parse(part.content, { async: false }) }
						: part
				)
			};
		})
	);

	private client = new ChatClient(
		createChatClientOptions({
			connection: fetchServerSentEvents(`/api/list/${this.userId}`),
			tools: clientToolDefList,
			initialMessages: [],
			onError(error) {
				alert(`something went wrong: ${error.message}`);
			},
			// WHY ISN'T THIS TYPE SAFE GUYS COME ON PLEASE
			onChunk: (chunk) => {
				switch (chunk.type) {
					case 'tool-input-available':
						console.log('tool-input-available', chunk.toolName);
						break;
					default:
						break;
				}
			},
			onMessagesChange: (messages) => {
				this.messages = messages;
			},
			onFinish: () => {
				this.isLoading = false;
			}
		})
	);

	constructor() {}

	startStream = async () => {
		this.isLoading = true;
		await this.client.sendMessage('Start the stream');
	};
}
