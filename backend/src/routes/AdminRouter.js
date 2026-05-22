import express from 'express';
import * as adminController from '../controllers/adminController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/admin/bookings', authController.getAdmin, adminController.getBookings);
router.patch('/admin/bookings/:booking_id', authController.getAdmin, adminController.updateBookingStatus);
router.get('/admin/bookings.csv', authController.getAdmin, adminController.getBookingsCsv);
router.get('/admin/contacts', authController.getAdmin, adminController.getContacts);
router.get('/admin/stats', authController.getAdmin, adminController.getStats);
router.get('/admin/slots', authController.getAdmin, adminController.getSlots);
router.post('/admin/slots', authController.getAdmin, adminController.createSlot);
router.delete('/admin/slots/:slot_id', authController.getAdmin, adminController.deleteSlot);
router.get('/admin/portfolio', authController.getAdmin, adminController.getPortfolioAdmin);
router.patch('/admin/portfolio/:key', authController.getAdmin, adminController.updatePortfolioVisibility);

export default router;