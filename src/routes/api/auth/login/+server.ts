import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { verifyPassword, generateToken } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, password } = await request.json();
		console.log('Login attempt for:', email);

		if (!email || !password) {
			return json({ error: 'Email and password are required' }, { status: 400 });
		}

		console.log('Querying PostgreSQL for user...');
		const result = await db.query(
			'SELECT id, username, email, password FROM users WHERE email = $1',
			[email]
		);

		const user = result.rows[0];
		console.log('PostgreSQL response:', { user: user ? 'found' : 'not found' });

		if (!user) {
			return json({ error: 'User not found' }, { status: 401 });
		}

		console.log('Verifying password...');
		if (!verifyPassword(password, user.password)) {
			return json({ error: 'Invalid password' }, { status: 401 });
		}

		const userPayload = {
			id: user.id,
			username: user.username,
			email: user.email
		};

		const token = generateToken(userPayload);
		console.log('Login successful for:', email);

		return json(
			{ user: userPayload, token },
			{
				status: 200,
				headers: {
					'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
				}
			}
		);
	} catch (error) {
		console.error('Login error:', error);
		return json({ error: 'Login failed: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
	}
};
