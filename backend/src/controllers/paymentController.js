const Stripe = require('stripe');
const { BookingModel, PaymentTransactionModel, SlotModel } = require('../models');
const { nowIso, generateId } = require('../utils');

const STRIPE_API_KEY = process.env.STRIPE_API_KEY || 'sk_test_dummy';
const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2024-12-18.acacia' });

const BOOKING_AMOUNT = 399.0;
const BOOKING_CURRENCY = 'inr';

const checkout = async (req, res) => {
  const { booking_id, origin_url } = req.body;
  const booking = await BookingModel.findOne({ id: booking_id });
  if (!booking) return res.status(404).json({ detail: 'Booking not found' });
  if (!booking.slot_id) return res.status(400).json({ detail: 'Please pick a slot before paying' });
  if (booking.status === 'paid') return res.status(400).json({ detail: 'Booking already paid' });

  const origin = origin_url.replace(/\/$/, '');
  const success_url = `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking.id}`;
  const cancel_url = `${origin}/booking/cancelled?booking_id=${booking.id}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: BOOKING_CURRENCY,
        product_data: { name: `Consultation Booking: ${booking.service_needed}` },
        unit_amount: Math.round(BOOKING_AMOUNT * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url,
    cancel_url,
    metadata: {
      booking_id: booking.id,
      email: booking.email,
      service: booking.service_needed,
    }
  });

  await PaymentTransactionModel.create({
    id: generateId(),
    session_id: session.id,
    booking_id: booking.id,
    email: booking.email,
    amount: BOOKING_AMOUNT,
    currency: BOOKING_CURRENCY,
    status: 'initiated',
    payment_status: 'pending',
    metadata: { service: booking.service_needed },
    created_at: nowIso(),
    updated_at: nowIso(),
  });

  await BookingModel.updateOne({ id: booking.id }, {
    $set: {
      status: 'payment_initiated',
      payment_session_id: session.id,
    }
  });

  res.json({ url: session.url, session_id: session.id });
};

const paymentStatus = async (req, res) => {
  const txn = await PaymentTransactionModel.findOne({ session_id: req.params.session_id }, { _id: 0, __v: 0 });
  if (!txn) return res.status(404).json({ detail: 'Payment not found' });

  if (txn.payment_status === 'paid') {
    return res.json({ status: txn.status, payment_status: 'paid', booking_id: txn.booking_id });
  }

  try {
    const status = await stripe.checkout.sessions.retrieve(req.params.session_id);
    await PaymentTransactionModel.updateOne({ session_id: req.params.session_id }, {
      $set: {
        status: status.status,
        payment_status: status.payment_status,
        updated_at: nowIso(),
      }
    });

    if (status.payment_status === 'paid' && txn.payment_status !== 'paid') {
      await BookingModel.updateOne({ id: txn.booking_id, status: { $ne: 'paid' } }, { $set: { status: 'paid' } });
    } else if (status.status === 'expired') {
      const booking = await BookingModel.findOne({ id: txn.booking_id });
      if (booking && booking.slot_id) {
        await SlotModel.updateOne({ id: booking.slot_id }, { $set: { is_booked: false, booking_id: null } });
      }
      await BookingModel.updateOne({ id: txn.booking_id }, { $set: { status: 'cancelled' } });
    }

    res.json({ status: status.status, payment_status: status.payment_status, booking_id: txn.booking_id });
  } catch (err) {
    res.status(502).json({ detail: 'Could not verify payment' });
  }
};

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    console.error('Stripe webhook failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;
  const sessionId = session.id;
  const paymentStatus = session.payment_status;

  if (!sessionId) return res.json({ ok: true });

  const txn = await PaymentTransactionModel.findOne({ session_id: sessionId });
  if (!txn) return res.json({ ok: true });

  await PaymentTransactionModel.updateOne(
    { session_id: sessionId },
    {
      $set: {
        payment_status: paymentStatus || txn.payment_status,
        updated_at: nowIso(),
      }
    }
  );

  if (paymentStatus === 'paid' && txn.payment_status !== 'paid') {
    await BookingModel.updateOne(
      { id: txn.booking_id, status: { $ne: 'paid' } },
      { $set: { status: 'paid' } }
    );
  }

  res.json({ ok: true });
};

module.exports = {
  checkout,
  paymentStatus,
  stripeWebhook,
};