const { BookingModel, ContactModel, SlotModel, PortfolioModel } = require('../models');
const { nowIso, generateId } = require('../utils');

const BOOKING_AMOUNT = 399.0;
const BOOKING_CURRENCY = 'inr';

const getStatus = (req, res) => {
  res.json({ service: 'Ask Array Tech API', status: 'ok' });
};

const createBooking = async (req, res) => {
  try {
    const doc = {
      id: generateId(),
      name: (req.body.name || '').trim(),
      email: (req.body.email || '').toLowerCase().trim(),
      phone: (req.body.phone || '').trim(),
      startup_idea: (req.body.startup_idea || '').trim(),
      service_needed: (req.body.service_needed || '').trim(),
      city: (req.body.city || '').trim() || null,
      budget_range: (req.body.budget_range || '').trim() || null,
      timeline_to_start: (req.body.timeline_to_start || '').trim() || null,
      amount: BOOKING_AMOUNT,
      currency: BOOKING_CURRENCY,
      status: 'lead',
      slot_id: null,
      slot_start: null,
      slot_end: null,
      payment_session_id: null,
      created_at: nowIso(),
    };
    await BookingModel.create(doc);
    const result = await BookingModel.findOne({ id: doc.id });
    if (result) {
      const { _id, ...rest } = result.toObject();
      res.status(201).json(rest);
    }
  } catch (err) {
    res.status(400).json({ detail: 'Invalid data' });
  }
};

const createContact = async (req, res) => {
  try {
    const doc = {
      id: generateId(),
      name: (req.body.name || '').trim(),
      email: (req.body.email || '').toLowerCase().trim(),
      message: (req.body.message || '').trim(),
      created_at: nowIso(),
    };
    await ContactModel.create(doc);
    const result = await ContactModel.findOne({ id: doc.id });
    if (result) {
      const { _id, ...rest } = result.toObject();
      res.status(201).json(rest);
    }
  } catch (err) {
    res.status(400).json({ detail: 'Invalid data' });
  }
};

const getAvailableSlots = async (req, res) => {
  const items = await SlotModel.find({ is_booked: false, start_at: { $gt: nowIso() } }, { _id: 0, __v: 0 }).sort({ start_at: 1 });
  res.json(items);
};

const selectBookingSlot = async (req, res) => {
  const { booking_id } = req.params;
  const { slot_id } = req.body;
  if (!slot_id) return res.status(400).json({ detail: 'slot_id is required' });

  const booking = await BookingModel.findOne({ id: booking_id });
  if (!booking) return res.status(404).json({ detail: 'Booking not found' });
  if (!['lead', 'slot_selected'].includes(booking.status)) {
    return res.status(400).json({ detail: 'Slot can only be picked before payment is initiated' });
  }

  const slot = await SlotModel.findOne({ id: slot_id });
  if (!slot) return res.status(404).json({ detail: 'Slot not found' });
  if (slot.is_booked && slot.booking_id !== booking_id) {
    return res.status(409).json({ detail: 'Slot already booked' });
  }

  if (booking.slot_id && booking.slot_id !== slot_id) {
    await SlotModel.updateOne({ id: booking.slot_id }, { $set: { is_booked: false, booking_id: null } });
  }

  await SlotModel.updateOne({ id: slot_id }, { $set: { is_booked: true, booking_id } });
  await BookingModel.updateOne({ id: booking_id }, {
    $set: {
      slot_id,
      slot_start: slot.start_at,
      slot_end: slot.end_at,
      status: 'slot_selected',
    }
  });

  const updated = await BookingModel.findOne({ id: booking_id }, { _id: 0, __v: 0 });
  res.json(updated);
};

const getPortfolio = async (req, res) => {
  const items = await PortfolioModel.find({ visible: true }, { _id: 0, __v: 0 }).sort({ order: 1 });
  res.json(items);
};

module.exports = {
  getStatus,
  createBooking,
  createContact,
  getAvailableSlots,
  selectBookingSlot,
  getPortfolio,
};