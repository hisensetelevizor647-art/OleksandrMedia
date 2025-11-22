import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async (event) => {
	try {
		const userId = event.params.id;

		const { data: user, error } = await supabase
			.from('users')
			.select('id, username, email, avatar, banner, description, created_at')
			.eq('id', userId)
			.single();

		if (error || !user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json({ user });
	} catch (error) {
		return json({ error: 'Failed to fetch user' }, { status: 500 });
	}
};
