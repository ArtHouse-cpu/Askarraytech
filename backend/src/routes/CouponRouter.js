import express from 'express';
import * as couponController from '../controllers/couponController.js';

const router = express.Router();

router.get('/coupons', couponController.getCoupons);
router.post('/coupons', couponController.createCoupon);
router.post('/coupons/validate', couponController.validateCoupon);
router.delete('/coupons/:id', couponController.deleteCoupon);

export default router;
