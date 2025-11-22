import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		// Total Views
		const { data: viewsData } = await supabase
			.from('videos')
			.select('views')
			.eq('user_id', user.id);

		const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

		// Total Videos
		const { count: totalVideos } = await supabase
			.from('videos')
			.select('*', { count: 'exact', head: true })
			.eq('user_id', user.id);

		// Total Likes (on user's videos)
		const { count: totalLikes } = await supabase
			.from('likes')
			.select('*, videos!inner(user_id)', { count: 'exact', head: true })
			.eq('videos.user_id', user.id)
			.eq('type', 'like');

		// Total Comments (on user's videos)
		const { count: totalComments } = await supabase
			.from('comments')
			.select('*, videos!inner(user_id)', { count: 'exact', head: true })
			.eq('videos.user_id', user.id);

		// Subscribers
		const { count: subscribers } = await supabase
			.from('subscriptions')
			.select('*', { count: 'exact', head: true })
			.eq('channel_id', user.id);

		return json({
			totalViews,
			totalVideos: totalVideos || 0,
			totalLikes: totalLikes || 0,
			totalComments: totalComments || 0,
			subscribers: subscribers || 0
		});
	} catch (error) {
		console.error('Stats error:', error);
		return json({ error: 'Failed to load stats' }, { status: 500 });
	}
};
