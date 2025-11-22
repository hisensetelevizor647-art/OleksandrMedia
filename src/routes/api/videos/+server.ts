import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { getUserFromRequest } from '$lib/auth';
import { storage } from '$lib/storage';

export const GET: RequestHandler = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('limit') || '20');
	const offset = parseInt(url.searchParams.get('offset') || '0');
	const search = url.searchParams.get('search') || '';
	const userId = url.searchParams.get('userId');

	let query = `
		SELECT v.*, u.username, u.avatar as user_avatar, u.banner
		FROM videos v
		JOIN users u ON v.user_id = u.id
	`;
	const params: any[] = [];
	let paramCount = 1;

	if (userId) {
		query += ` WHERE v.user_id = $${paramCount}`;
		params.push(userId);
		paramCount++;
	} else if (search) {
		query += ` WHERE v.title ILIKE $${paramCount}`;
		params.push(`%${search}%`);
		paramCount++;
	}

	query += ` ORDER BY v.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
	params.push(limit, offset);

	const result = await db.query(query, params);

	const formattedVideos = result.rows.map(v => ({
		...v,
		likes: 0, // TODO: Implement likes count
		dislikes: 0
	}));

	return json({ videos: formattedVideos });
};

export const POST: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await event.request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const videoFile = formData.get('video') as File;
		const thumbnailFile = formData.get('thumbnail') as File;

		if (!title || !videoFile) {
			return json({ error: 'Title and video are required' }, { status: 400 });
		}

		// Upload Video to R2
		const videoKey = storage.generateFileName(user.id, 'video', videoFile.name);
		const { url: videoUrl } = await storage.upload(videoFile, videoKey, videoFile.type);

		let thumbnailUrl = null;

		// Upload Thumbnail to R2 if provided
		if (thumbnailFile && thumbnailFile.size > 0) {
			const thumbKey = storage.generateFileName(user.id, 'thumbnail', thumbnailFile.name);
			const { url } = await storage.upload(thumbnailFile, thumbKey, thumbnailFile.type);
			thumbnailUrl = url;
		}

		// Insert into PostgreSQL
		const result = await db.query(
			`INSERT INTO videos (user_id, title, description, video_url, thumbnail_url, thumbnail, duration)
			 VALUES ($1, $2, $3, $4, $5, $5, 0)
			 RETURNING *`,
			[user.id, title, description || null, videoUrl, thumbnailUrl]
		);

		const video = result.rows[0];

		// Get user info
		const userResult = await db.query(
			'SELECT username, avatar FROM users WHERE id = $1',
			[user.id]
		);

		const formattedVideo = {
			...video,
			username: userResult.rows[0]?.username,
			user_avatar: userResult.rows[0]?.avatar
		};

		return json({ video: formattedVideo }, { status: 201 });

	} catch (error) {
		console.error('Upload error:', error);
		return json({ error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
	}
};
