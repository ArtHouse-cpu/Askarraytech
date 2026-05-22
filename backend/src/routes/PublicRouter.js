import express from 'express';
import * as publicController from '../controllers/publicController.js';

const router = express.Router();

router.get('/', publicController.getStatus);
router.post('/bookings', publicController.createBooking);
router.post('/contacts', publicController.createContact);
router.get('/slots/available', publicController.getAvailableSlots);
router.post('/bookings/:booking_id/slot', publicController.selectBookingSlot);
router.get('/portfolio', publicController.getPortfolio);

export default router;