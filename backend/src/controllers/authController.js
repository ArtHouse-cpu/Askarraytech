import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ACCESS_TOKEN_EXPIRE_MIN = 60 * 12;

const verifyPassword = async (plain, hashed) => bcrypt.compare(plain, hashed);

const createAccessToken = (userId, email) => {
  return jwt.sign(
    { sub: userId, email, type: 'access' },
    JWT_SECRET,
    { expiresIn: `${ACCESS_TOKEN_EXPIRE_MIN}m` }
  );
};

const getAdmin = async (req, res, next) => {
  try {
    let token = '';
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    if (!token) {
      return res.status(401).json({ detail: 'Not authenticated' });
    }
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.type !== 'access') {
      return res.status(401).json({ detail: 'Invalid token type' });
    }
    const user = await UserModel.findOne({ id: payload.sub });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ detail: 'Admin not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ detail: 'Invalid token' });
  }
};

const login = async (req, res) => {
  const email = (req.body.email || '').toLowerCase().trim();
  const user = await UserModel.findOne({ email });
  if (!user || !(await verifyPassword(req.body.password, user.password_hash))) {
    return res.status(401).json({ detail: 'Invalid email or password' });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ detail: 'Not an admin account' });
  }
  const token = createAccessToken(user.id, user.email);
  res.json({ token, email: user.email, name: user.name });
};

const getMe = (req, res) => {
  const user = req.user;
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
};

export {
  verifyPassword,
  createAccessToken,
  getAdmin,
  login,
  getMe,
};