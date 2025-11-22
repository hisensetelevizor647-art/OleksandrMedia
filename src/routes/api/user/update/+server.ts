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
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const description = formData.get('description') as string;
		const avatarFile = formData.get('avatar') as File | null;
		const bannerFile = formData.get('banner') as File | null;

		if (!username || !email) {
			return json({ error: 'Username and email are required' }, { status: 400 });
		}

		const { data: existing } = await supabase
			.from('users')
			.select('id')
			.or(`username.eq.${username},email.eq.${email}`)
			.neq('id', user.id)
			.single();

		if (existing) {
			return json({ error: 'Username or email already taken' }, { status: 409 });
		}

		let avatarUrl = null;
		let bannerUrl = null;
		const timestamp = Date.now();

		if (avatarFile && avatarFile.size > 0) {
			const avatarExt = avatarFile.name.split('.').pop();
			const avatarPath = `${user.id}/avatar_${timestamp}.${avatarExt}`;

			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(avatarPath, avatarFile);

			if (uploadError) throw uploadError;

			const { data: { publicUrl } } = supabase.storage
				.from('avatars')
				.getPublicUrl(avatarPath);
			avatarUrl = publicUrl;
		}

		if (bannerFile && bannerFile.size > 0) {
			const bannerExt = bannerFile.name.split('.').pop();
			const bannerPath = `${user.id}/banner_${timestamp}.${bannerExt}`;

			const { error: uploadError } = await supabase.storage
				.from('banners')
				.upload(bannerPath, bannerFile);

			if (uploadError) throw uploadError;

			const { data: { publicUrl } } = supabase.storage
				.from('banners')
				.getPublicUrl(bannerPath);
			bannerUrl = publicUrl;
		}

		const updates: any = {
			username,
			email,
			description: description || null
		};

		if (avatarUrl) updates.avatar = avatarUrl;
		if (bannerUrl) updates.banner = bannerUrl;

		const { data: updatedUser, error } = await supabase
			.from('users')
			.update(updates)
			.eq('id', user.id)
			.select('id, username, email, avatar, banner, description, created_at')
			.single();

		if (error) throw error;

		return json({ user: updatedUser });
	} catch (error) {
		console.error('Update error:', error);
		return json({ error: 'Failed to update profile' }, { status: 500 });
	}
};
