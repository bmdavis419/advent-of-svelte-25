import { clientToolDefList } from '$lib/ai/tool-defs';
import { ChatClient, fetchServerSentEvents } from '@tanstack/ai-client';

export class ListStore {
	userId = $state('fake_user_id');
	isLoading = $state(false);

	private client = new ChatClient({
		connection: fetchServerSentEvents(`/api/list/${this.userId}`),
		tools: clientToolDefList,
		initialMessages: [],
		onMessagesChange: (messages) => {
			console.log('messages', messages);
		},
		onFinish: () => {
			this.isLoading = false;
		}
	});

	constructor() {
		$inspect(this.isLoading);
	}

	startStream = async () => {
		this.isLoading = true;
		await this.client.sendMessage('Start the stream');
	};
}
