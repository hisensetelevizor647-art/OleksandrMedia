import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const POST: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const commentId = event.params.id;

		// Verify user is video author
		const { data: comment } = await supabase
			.from('comments')
			.select('*, videos(user_id)')
			.eq('id', commentId)
			.single();

		if (!comment) {
			return json({ error: 'Comment not found' }, { status: 404 });
		}

		if (comment.videos?.user_id !== user.id) {
			return json({ error: 'Only video author can heart comments' }, { status: 403 });
		}

		const newHearted = !comment.is_hearted;
		await supabase
			.from('comments')
			.update({ is_hearted: newHearted })
			.eq('id', commentId);

		return json({ is_hearted: newHearted });
	} catch (error) {
		console.error('Heart error:', error);
		return json({ error: 'Failed to heart comment' }, { status: 500 });
	}
};
