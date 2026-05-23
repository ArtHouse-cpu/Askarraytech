import { BookingModel, ContactModel, SlotModel, PortfolioModel } from '../models/index.js';
import { nowIso, generateId } from '../utils/index.js';

const BOOKING_AMOUNT = 399.0;

const getBookings = async (req, res) => {
  const items = await BookingModel.find({}, { _id: 0, __v: 0 }).sort({ created_at: -1 });
  res.json(items);
};

const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['lead', 'slot_selected', 'payment_initiated', 'paid', 'cancelled', 'completed', 'refunded'];
  if (!validStatuses.includes(status)) return res.status(400).json({ detail: 'Invalid booking status' });

  const booking = await BookingModel.findOne({ id: req.params.booking_id });
  if (!booking) return res.status(404).json({ detail: 'Booking not found' });

  await BookingModel.updateOne({ id: req.params.booking_id }, { $set: { status } });
  if (['cancelled', 'refunded'].includes(status) && booking.slot_id) {
    await SlotModel.updateOne({ id: booking.slot_id }, { $set: { is_booked: false, booking_id: null } });
  }

  const updated = await BookingModel.findOne({ id: req.params.booking_id }, { _id: 0, __v: 0 });
  res.json(updated);
};

const getBookingsCsv = async (req, res) => {
  const items = await BookingModel.find({}, { _id: 0, __v: 0 }).sort({ created_at: -1 });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="bookings_${new Date().toISOString()}.csv"`);
  
  let csv = 'id,created_at,name,email,phone,city,service_needed,startup_idea,budget_range,timeline_to_start,status\n';
  for (const b of items) {
    csv += `"${b.id}","${b.created_at}","${b.name}","${b.email}","${b.phone}","${b.city || ''}","${b.service_needed}","${(b.startup_idea || '').replace(/\n/g, ' ')}","${b.budget_range || ''}","${b.timeline_to_start || ''}","${b.status}"\n`;
  }
  res.send(csv);
};

const getContacts = async (req, res) => {
  const items = await ContactModel.find({}, { _id: 0, __v: 0 }).sort({ created_at: -1 });
  res.json(items);
};

const getStats = async (req, res) => {
  const bookings_total = await BookingModel.countDocuments();
  const paid_total = await BookingModel.countDocuments({ status: { $in: ['paid', 'completed'] } });
  const unpaid_total = await BookingModel.countDocuments({ status: { $nin: ['paid', 'completed'] } });
  
  // Calculate unique customers based on email
  const unique_emails = await BookingModel.distinct('email');
  const customers_total = unique_emails.length;

  const contacts_total = await ContactModel.countDocuments();
  const slots_total = await SlotModel.countDocuments();
  const slots_available = await SlotModel.countDocuments({ is_booked: false, start_at: { $gt: nowIso() } });
  
  res.json({
    bookings_total,
    bookings_paid: paid_total,
    bookings_unpaid: unpaid_total,
    customers_total,
    contacts_total,
    slots_total,
    slots_available,
    revenue_inr: parseFloat((paid_total * BOOKING_AMOUNT).toFixed(2)),
  });
};

const getSlots = async (req, res) => {
  const items = await SlotModel.find({}, { _id: 0, __v: 0 }).sort({ start_at: 1 });
  res.json(items);
};

const createSlot = async (req, res) => {
  const { start_at, duration_minutes = 30 } = req.body;
  let start;
  try {
    start = new Date(start_at);
    if (isNaN(start.getTime())) throw new Error();
  } catch {
    return res.status(400).json({ detail: 'Invalid start_at (ISO datetime required)' });
  }
  if (duration_minutes <= 0 || duration_minutes > 240) {
    return res.status(400).json({ detail: 'duration_minutes must be 1..240' });
  }

  const existing = await SlotModel.findOne({ start_at: start.toISOString() });
  if (existing) return res.status(409).json({ detail: 'Slot already exists at this time' });

  const end = new Date(start.getTime() + duration_minutes * 60000);
  const doc = {
    id: generateId(),
    start_at: start.toISOString(),
    end_at: end.toISOString(),
    is_booked: false,
    booking_id: null,
    created_at: nowIso(),
  };
  await SlotModel.create(doc);
  const result = await SlotModel.findOne({ id: doc.id });
  if (result) {
    const { _id, ...rest } = result.toObject();
    res.status(201).json(rest);
  }
};

const deleteSlot = async (req, res) => {
  const slot = await SlotModel.findOne({ id: req.params.slot_id });
  if (!slot) return res.status(404).json({ detail: 'Slot not found' });
  if (slot.is_booked) return res.status(400).json({ detail: 'Cannot delete a booked slot' });
  await SlotModel.deleteOne({ id: req.params.slot_id });
  res.json({ ok: true });
};

const getPortfolioAdmin = async (req, res) => {
  const items = await PortfolioModel.find({}, { _id: 0, __v: 0 }).sort({ order: 1 });
  res.json(items);
};

const updatePortfolioVisibility = async (req, res) => {
  const { visible } = req.body;
  const item = await PortfolioModel.findOne({ key: req.params.key });
  if (!item) return res.status(404).json({ detail: 'Portfolio item not found' });
  await PortfolioModel.updateOne({ key: req.params.key }, { $set: { visible: Boolean(visible) } });
  const updated = await PortfolioModel.findOne({ key: req.params.key }, { _id: 0, __v: 0 });
  res.json(updated);
};

export {
  getBookings,
  updateBookingStatus,
  getBookingsCsv,
  getContacts,
  getStats,
  getSlots,
  createSlot,
  deleteSlot,
  getPortfolioAdmin,
  updatePortfolioVisibility,
};