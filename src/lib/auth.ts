import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { RequestEvent } from '@sveltejs/kit';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'a9c8b3c79ce693c6d487daece1f0e0604705c80804b861a260501c9ca1859e26';

export interface UserPayload {
	id: number;
	username: string;
	email: string;
}

export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
	return bcrypt.compareSync(password, hash);
}

export function generateToken(user: UserPayload): string {
	return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserPayload | null {
	try {
		return jwt.verify(token, JWT_SECRET) as UserPayload;
	} catch {
		return null;
	}
}

export function getUserFromRequest(event: RequestEvent): UserPayload | null {
	const cookieHeader = event.request.headers.get('cookie');
	if (!cookieHeader) return null;

	const cookies = parse(cookieHeader);
	const token = cookies.token;

	if (!token) return null;

	return verifyToken(token);
}
