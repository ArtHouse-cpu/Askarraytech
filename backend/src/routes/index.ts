// @ts-nocheck
import express from 'express';
import * as publicController from '../controllers/publicController';
import * as paymentController from '../controllers/paymentController';
import * as authController from '../controllers/authController';
import * as adminController from '../controllers/adminController';

const router = express.Router();

// Public Routes
router.get('/', publicController.getStatus);
router.post('/bookings', publicController.createBooking);
router.post('/contacts', publicController.createContact);
router.get('/slots/available', publicController.getAvailableSlots);
router.post('/bookings/:booking_id/slot', publicController.selectBookingSlot);
router.get('/portfolio', publicController.getPortfolio);

// Payments
router.post('/payments/checkout', paymentController.checkout);
router.get('/payments/status/:session_id', paymentController.paymentStatus);

// Auth
router.post('/auth/login', authController.login);
router.get('/auth/me', authController.getAdmin, authController.getMe);

// Admin Routes
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
