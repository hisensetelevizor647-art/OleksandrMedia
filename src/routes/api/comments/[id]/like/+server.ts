import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const POST: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const commentId = event.params.id;
		const { type } = await event.request.json();

		if (!['like', 'dislike'].includes(type)) {
			return json({ error: 'Invalid type' }, { status: 400 });
		}

		const { data: existing } = await supabase
			.from('comment_likes')
			.select('type')
			.match({ comment_id: commentId, user_id: user.id })
			.single();

		if (existing) {
			if (existing.type === type) {
				await supabase
					.from('comment_likes')
					.delete()
					.match({ comment_id: commentId, user_id: user.id });
				return json({ action: 'removed' });
			} else {
				await supabase
					.from('comment_likes')
					.update({ type })
					.match({ comment_id: commentId, user_id: user.id });
				return json({ action: 'updated', type });
			}
		} else {
			await supabase
				.from('comment_likes')
				.insert({ comment_id: commentId, user_id: user.id, type });
			return json({ action: 'added', type });
		}
	} catch (error) {
		console.error('Comment like error:', error);
		return json({ error: 'Failed to like comment' }, { status: 500 });
	}
};

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ like: null });

	try {
		const commentId = event.params.id;
		const { data: like } = await supabase
			.from('comment_likes')
			.select('type')
			.match({ comment_id: commentId, user_id: user.id })
			.single();

		return json({ like: like?.type || null });
	} catch (error) {
		return json({ like: null });
	}
};
