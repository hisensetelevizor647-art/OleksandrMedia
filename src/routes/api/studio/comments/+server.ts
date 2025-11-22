import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const { data: comments } = await supabase
			.from('comments')
			.select(`
				*,
				users (username),
				videos!inner (title, user_id)
			`)
			.eq('videos.user_id', user.id)
			.order('created_at', { ascending: false });

		if (!comments) return json({ comments: [] });

		const formattedComments = comments.map((c: any) => ({
			...c,
			username: c.users?.username,
			video_title: c.videos?.title
		}));

		return json({ comments: formattedComments });
	} catch (error) {
		return json({ error: 'Failed to load comments' }, { status: 500 });
	}
};
