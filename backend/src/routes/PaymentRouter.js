import express from 'express';
import * as paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payments/checkout', paymentController.checkout);
router.post('/payments/verify', paymentController.verify);
router.get('/payments/status/:session_id', paymentController.paymentStatus);

export default router;