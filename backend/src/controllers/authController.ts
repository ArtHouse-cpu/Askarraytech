// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ACCESS_TOKEN_EXPIRE_MIN = 60 * 12;

export const verifyPassword = async (plain: string, hashed: string) => bcrypt.compare(plain, hashed);

export const createAccessToken = (userId: string, email: string) => {
  return jwt.sign(
    { sub: userId, email, type: 'access' },
    JWT_SECRET,
    { expiresIn: `${ACCESS_TOKEN_EXPIRE_MIN}m` }
  );
};

export const getAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    let token = '';
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    if (!token) {
      return res.status(401).json({ detail: 'Not authenticated' });
    }
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (payload.type !== 'access') {
      return res.status(401).json({ detail: 'Invalid token type' });
    }
    const user = await UserModel.findOne({ id: payload.sub });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ detail: 'Admin not found' });
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ detail: 'Invalid token' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const email = (req.body.email || '').toLowerCase().trim();
  const user = await UserModel.findOne({ email });
  if (!user || !(await verifyPassword(req.body.password, user.password_hash as string))) {
    return res.status(401).json({ detail: 'Invalid email or password' });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ detail: 'Not an admin account' });
  }
  const token = createAccessToken(user.id as string, user.email as string);
  res.json({ token, email: user.email, name: user.name });
};

export const getMe = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
};
