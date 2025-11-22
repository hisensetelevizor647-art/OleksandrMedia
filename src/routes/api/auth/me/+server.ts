import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserFromRequest } from '$lib/auth';
import { db } from '$lib/db';

export const GET: RequestHandler = async (event) => {
	const user = getUserFromRequest(event);

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const result = await db.query(
		'SELECT id, username, email, avatar, banner, description, created_at FROM users WHERE id = $1',
		[user.id]
	);

	const fullUser = result.rows[0];

	if (!fullUser) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json({ user: fullUser });
};
