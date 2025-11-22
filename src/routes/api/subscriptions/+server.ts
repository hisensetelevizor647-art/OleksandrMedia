import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const POST: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { channelId } = await event.request.json();

		if (!channelId) {
			return json({ error: 'Channel ID is required' }, { status: 400 });
		}

		if (channelId === user.id) {
			return json({ error: 'Cannot subscribe to yourself' }, { status: 400 });
		}

		const { data: existing } = await supabase
			.from('subscriptions')
			.select('*')
			.match({ subscriber_id: user.id, channel_id: channelId })
			.single();

		if (existing) {
			await supabase
				.from('subscriptions')
				.delete()
				.match({ subscriber_id: user.id, channel_id: channelId });
			return json({ subscribed: false });
		} else {
			await supabase
				.from('subscriptions')
				.insert({ subscriber_id: user.id, channel_id: channelId });
			return json({ subscribed: true });
		}
	} catch (error) {
		console.error('Subscription error:', error);
		return json({ error: 'Failed to process subscription' }, { status: 500 });
	}
};

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	const channelId = event.url.searchParams.get('channelId');

	if (!user || !channelId) {
		return json({ subscribed: false });
	}

	const { data: subscription } = await supabase
		.from('subscriptions')
		.select('*')
		.match({ subscriber_id: user.id, channel_id: channelId })
		.single();

	return json({ subscribed: !!subscription });
};
