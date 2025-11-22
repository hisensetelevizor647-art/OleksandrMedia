import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const POST: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const { videoId } = await event.request.json();
		await supabase
			.from('watch_history')
			.insert({ user_id: user.id, video_id: videoId });
		return json({ success: true });
	} catch (error) {
		return json({ success: false });
	}
};

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		// Note: Supabase doesn't support DISTINCT ON in simple queries easily without RPC or complex joins
		// For now, we fetch history and deduplicate in JS or just show all
		const { data: history } = await supabase
			.from('watch_history')
			.select(`
				watched_at,
				videos (
					*,
					users (username, avatar)
				)
			`)
			.eq('user_id', user.id)
			.order('watched_at', { ascending: false })
			.limit(50);

		if (!history) return json({ videos: [] });

		// Transform and deduplicate
		const seenVideos = new Set();
		const videos = history
			.map((h: any) => {
				const v = h.videos;
				if (!v) return null;
				return {
					...v,
					username: v.users?.username,
					user_avatar: v.users?.avatar,
					likes: 0, // TODO
					dislikes: 0,
					watched_at: h.watched_at
				};
			})
			.filter(v => v && !seenVideos.has(v.id) && seenVideos.add(v.id));

		return json({ videos });
	} catch (error) {
		return json({ error: 'Failed to load history' }, { status: 500 });
	}
};
