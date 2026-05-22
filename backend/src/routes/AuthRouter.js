import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/login', authController.login);
router.get('/auth/me', authController.getAdmin, authController.getMe);

export default router;