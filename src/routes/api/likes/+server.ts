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
		const { videoId, type } = await event.request.json();

		if (!videoId || !type || !['like', 'dislike'].includes(type)) {
			return json({ error: 'Invalid request' }, { status: 400 });
		}

		const { data: existing } = await supabase
			.from('likes')
			.select('*')
			.match({ video_id: videoId, user_id: user.id })
			.single();

		if (existing) {
			if (existing.type === type) {
				// Remove like
				await supabase
					.from('likes')
					.delete()
					.match({ video_id: videoId, user_id: user.id });
				return json({ action: 'removed', type });
			} else {
				// Update like
				await supabase
					.from('likes')
					.update({ type })
					.match({ video_id: videoId, user_id: user.id });
				return json({ action: 'updated', type });
			}
		} else {
			// Add like
			await supabase
				.from('likes')
				.insert({ video_id: videoId, user_id: user.id, type });
			return json({ action: 'added', type });
		}
	} catch (error) {
		console.error('Like error:', error);
		return json({ error: 'Failed to process like' }, { status: 500 });
	}
};

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	const videoId = event.url.searchParams.get('videoId');

	if (!user || !videoId) {
		return json({ like: null });
	}

	const { data: like } = await supabase
		.from('likes')
		.select('type')
		.match({ video_id: videoId, user_id: user.id })
		.single();

	return json({ like: like?.type || null });
};
