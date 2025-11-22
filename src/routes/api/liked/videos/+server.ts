import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const { data: likes } = await supabase
			.from('likes')
			.select(`
				created_at,
				videos (
					*,
					users (username, avatar)
				)
			`)
			.eq('user_id', user.id)
			.eq('type', 'like')
			.order('created_at', { ascending: false });

		if (!likes) return json({ videos: [] });

		const videos = likes
			.map((l: any) => {
				const v = l.videos;
				if (!v) return null;
				return {
					...v,
					username: v.users?.username,
					user_avatar: v.users?.avatar,
					likes: 0, // TODO
					dislikes: 0
				};
			})
			.filter(v => v);

		return json({ videos });
	} catch (error) {
		return json({ error: 'Failed to load liked videos' }, { status: 500 });
	}
};
