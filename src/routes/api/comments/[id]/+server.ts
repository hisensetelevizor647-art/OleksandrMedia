import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const DELETE: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const commentId = event.params.id;

		if (!commentId) {
			return json({ error: 'Comment ID required' }, { status: 400 });
		}

		// Get comment info including video owner
		const { data: comment } = await supabase
			.from('comments')
			.select('user_id, video_id, videos(user_id)')
			.eq('id', commentId)
			.single();

		if (!comment) {
			return json({ error: 'Comment not found' }, { status: 404 });
		}

		// Allow deletion if user is comment author OR video owner
		if (comment.user_id !== user.id && comment.videos?.user_id !== user.id) {
			return json({ error: 'Not authorized to delete this comment' }, { status: 403 });
		}

		// Delete comment (this will also delete replies due to CASCADE)
		const { error } = await supabase
			.from('comments')
			.delete()
			.eq('id', commentId);

		if (error) throw error;

		return json({ success: true });
	} catch (error) {
		console.error('Delete comment error:', error);
		return json({ error: 'Failed to delete comment' }, { status: 500 });
	}
};

export const PUT: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const commentId = event.params.id;
		const { content } = await event.request.json();

		if (!commentId || !content) {
			return json({ error: 'Comment ID and content required' }, { status: 400 });
		}

		const { data: comment } = await supabase
			.from('comments')
			.select('user_id')
			.eq('id', commentId)
			.single();

		if (!comment) {
			return json({ error: 'Comment not found' }, { status: 404 });
		}

		if (comment.user_id !== user.id) {
			return json({ error: 'Not authorized to edit this comment' }, { status: 403 });
		}

		const { error } = await supabase
			.from('comments')
			.update({ content })
			.eq('id', commentId);

		if (error) throw error;

		return json({ success: true });
	} catch (error) {
		console.error('Edit comment error:', error);
		return json({ error: 'Failed to edit comment' }, { status: 500 });
	}
};
