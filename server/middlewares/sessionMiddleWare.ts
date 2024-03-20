import User from '../models/User';
import { UserAttributes } from '../types';
import { verifyToken } from '../utils/jwtUtils'
import { Request, Response, NextFunction } from 'express';

export async function sessionMiddleWare(req: Request, res: Response, next: NextFunction) {
	const tokenHeader: string | undefined = req.headers['authorization'];
	const token = tokenHeader && tokenHeader.startsWith('Bearer ')
		? tokenHeader.substring(7)
		: false

	if (!token) {
		return res.status(401).json({ error: true, message: 'Token is required', data: null });
	}

	const decoded: any = verifyToken(token)

	if (decoded == false) {
		return res.status(404).json({ error: true, message: 'Token is invalid', data: null });
	}

	const userFound: User | null = await User.findOne({
		where: { id: decoded.userId},
		attributes: ['id']
	});

	if (!userFound) {
		return res.status(404).json({ error: true, message: 'User not found', data: null});
	}
  	res.locals.user = userFound;

	next();
}