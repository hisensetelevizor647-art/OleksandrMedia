import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const GET: RequestHandler = async ({ params }) => {
	const { data: video, error } = await supabase
		.from('videos')
		.select('*, users(username, avatar, description)')
		.eq('id', params.id)
		.single();

	if (error || !video) {
		return json({ error: 'Video not found' }, { status: 404 });
	}

	// Increment views (fire and forget, best effort)
	// Note: This is not atomic without RPC
	supabase.rpc('increment_views', { video_id: params.id }).then(({ error }) => {
		if (error) {
			// Fallback if RPC doesn't exist
			supabase
				.from('videos')
				.update({ views: (video.views || 0) + 1 })
				.eq('id', params.id);
		}
	});

	const formattedVideo = {
		...video,
		username: video.users?.username,
		user_avatar: video.users?.avatar,
		user_description: video.users?.description,
		likes: 0, // TODO: Implement
		dislikes: 0,
		subscribers: 0
	};

	return json({ video: formattedVideo });
};

export const DELETE: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data: video } = await supabase
		.from('videos')
		.select('user_id')
		.eq('id', event.params.id)
		.single();

	if (!video) {
		return json({ error: 'Video not found' }, { status: 404 });
	}

	if (video.user_id !== user.id) {
		return json({ error: 'Forbidden' }, { status: 403 });
	}

	const { error } = await supabase
		.from('videos')
		.delete()
		.eq('id', event.params.id);

	if (error) {
		return json({ error: 'Delete failed' }, { status: 500 });
	}

	return json({ success: true });
};
