import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { hashPassword, generateToken } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { username, email, password } = await request.json();

		if (!username || !email || !password) {
			return json({ error: 'All fields are required' }, { status: 400 });
		}

		if (password.length < 6) {
			return json({ error: 'Password must be at least 6 characters' }, { status: 400 });
		}

		// Check if user already exists
		const existingResult = await db.query(
			'SELECT id FROM users WHERE email = $1 OR username = $2',
			[email, username]
		);

		if (existingResult.rows.length > 0) {
			return json({ error: 'User already exists' }, { status: 409 });
		}

		const hashedPassword = hashPassword(password);
		const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=ff0000&color=fff`;

		// Insert new user
		const insertResult = await db.query(
			'INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
			[username, email, hashedPassword, avatar]
		);

		const newUser = insertResult.rows[0];

		const user = {
			id: newUser.id,
			username,
			email
		};

		const token = generateToken(user);

		return json(
			{ user, token },
			{
				status: 201,
				headers: {
					'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
				}
			}
		);
	} catch (error) {
		console.error('Register error:', error);
		return json({ error: 'Registration failed' }, { status: 500 });
	}
};
