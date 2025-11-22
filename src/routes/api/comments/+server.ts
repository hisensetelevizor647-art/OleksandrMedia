import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const GET: RequestHandler = async ({ url }) => {
	const videoId = url.searchParams.get('videoId');

	if (!videoId) {
		return json({ error: 'Video ID is required' }, { status: 400 });
	}

	// Fetch all comments for the video
	const { data: allComments, error } = await supabase
		.from('comments')
		.select('*, users(username, avatar)')
		.eq('video_id', videoId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching comments:', error);
		return json({ comments: [] });
	}

	// Organize into threads
	const threads = allComments
		.filter(c => !c.parent_id)
		.map(comment => {
			const replies = allComments
				.filter(c => c.parent_id === comment.id)
				.map(reply => ({
					...reply,
					username: reply.users?.username,
					avatar: reply.users?.avatar,
					likes: 0, // TODO: Implement
					dislikes: 0
				}))
				.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

			return {
				...comment,
				username: comment.users?.username,
				avatar: comment.users?.avatar,
				likes: 0, // TODO: Implement
				dislikes: 0,
				reply_count: replies.length,
				replies
			};
		})
		.sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)); // Pinned first

	return json({ comments: threads });
};

export const POST: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { videoId, content, parentId } = await event.request.json();

		if (!videoId || !content) {
			return json({ error: 'Video ID and content are required' }, { status: 400 });
		}

		const { data: comment, error } = await supabase
			.from('comments')
			.insert({
				video_id: videoId,
				user_id: user.id,
				content,
				parent_id: parentId || null
			})
			.select('*, users(username, avatar)')
			.single();

		if (error) throw error;

		const formattedComment = {
			...comment,
			username: comment.users?.username,
			avatar: comment.users?.avatar,
			likes: 0,
			dislikes: 0
		};

		return json({ comment: formattedComment }, { status: 201 });
	} catch (error) {
		console.error('Comment error:', error);
		return json({ error: 'Failed to create comment' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const commentId = event.url.searchParams.get('id');
		if (!commentId) {
			return json({ error: 'Comment ID required' }, { status: 400 });
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
			return json({ error: 'Not authorized to delete this comment' }, { status: 403 });
		}

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
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const commentId = event.url.searchParams.get('id');
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
