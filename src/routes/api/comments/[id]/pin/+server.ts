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
			return json({ error: 'Only video author can pin comments' }, { status: 403 });
		}

		// Unpin all other comments on this video first
		await supabase
			.from('comments')
			.update({ is_pinned: false })
			.eq('video_id', comment.video_id);

		// Toggle pin on this comment
		const newPinned = !comment.is_pinned;
		await supabase
			.from('comments')
			.update({ is_pinned: newPinned })
			.eq('id', commentId);

		return json({ is_pinned: newPinned });
	} catch (error) {
		console.error('Pin error:', error);
		return json({ error: 'Failed to pin comment' }, { status: 500 });
	}
};
