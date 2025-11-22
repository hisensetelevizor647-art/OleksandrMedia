import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUserFromRequest } from '$lib/auth';

export const PUT: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await event.request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const thumbnailFile = formData.get('thumbnail') as File | null;
		const videoId = event.params.id;

		if (!title) {
			return json({ error: 'Title is required' }, { status: 400 });
		}

		const { data: video } = await supabase
			.from('videos')
			.select('*')
			.eq('id', videoId)
			.single();

		if (!video) {
			return json({ error: 'Video not found' }, { status: 404 });
		}

		if (video.user_id !== user.id) {
			return json({ error: 'Forbidden' }, { status: 403 });
		}

		let thumbnailUrl = video.thumbnail_url || video.thumbnail;

		if (thumbnailFile && thumbnailFile.size > 0) {
			const ext = thumbnailFile.name.split('.').pop();
			const filename = `${user.id}/thumb_${videoId}_${Date.now()}.${ext}`;

			const { error: uploadError } = await supabase.storage
				.from('videos')
				.upload(filename, thumbnailFile);

			if (uploadError) throw uploadError;

			const { data: { publicUrl } } = supabase.storage
				.from('videos')
				.getPublicUrl(filename);
			thumbnailUrl = publicUrl;
		}

		const { data: updatedVideo, error } = await supabase
			.from('videos')
			.update({
				title,
				description: description || null,
				thumbnail_url: thumbnailUrl,
				thumbnail: thumbnailUrl
			})
			.eq('id', videoId)
			.select()
			.single();

		if (error) throw error;

		return json({ video: updatedVideo });
	} catch (error: any) {
		console.error('Update error:', error);
		return json({ error: 'Failed to update video: ' + error.message }, { status: 500 });
	}
};
