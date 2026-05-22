import nodemailer from 'nodemailer';
import { BookingModel } from '../models/index.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
});

// Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Transporter verification failed:', error);
  } else {
    console.log('SMTP Transporter is ready to send notifications');
  }
});

/**
 * Format ISO slot start string to a reader-friendly Indian Standard Time (IST) string.
 * @param {string} isoString 
 * @returns {object} { date: string, time: string }
 */
function formatSlotTime(isoString) {
  if (!isoString) {
    return { date: 'To be scheduled', time: 'To be scheduled' };
  }
  try {
    const date = new Date(isoString);
    const dateFormatted = date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeFormatted = date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) + ' (IST)';
    return { date: dateFormatted, time: timeFormatted };
  } catch (err) {
    console.error('Error formatting slot date:', err);
    return { date: isoString, time: '' };
  }
}

/**
 * Sends a booking confirmation email to the user.
 * @param {string} bookingId 
 */
export async function sendBookingConfirmationEmail(bookingId) {
  try {
    const booking = await BookingModel.findOne({ id: bookingId });
    if (!booking) {
      console.error(`Booking not found for email notification: ${bookingId}`);
      return;
    }

    const { name, email, service_needed, slot_start, amount } = booking;
    if (!email) {
      console.error(`No email address available for booking: ${bookingId}`);
      return;
    }

    const { date: slotDate, time: slotTime } = formatSlotTime(slot_start);
    const sender = process.env.SENDER_EMAIL || 'justinanurag0.2@gmail.com';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed | Ask Array Tech</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f7f7f7;
            color: #333333;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border: 1px solid #eaeaea;
          }
          .header {
            background-color: #0a0a0a;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .header span {
            color: #D4AF37;
            font-size: 11px;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            display: block;
            margin-top: 5px;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 15px;
            color: #111111;
          }
          .intro-text {
            font-size: 15px;
            line-height: 1.6;
            margin-top: 0;
            margin-bottom: 25px;
            color: #555555;
          }
          .details-card {
            background-color: #fafafa;
            border-radius: 8px;
            border: 1px solid #eaeaea;
            padding: 24px;
            margin-bottom: 30px;
          }
          .details-title {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #D4AF37;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 16px;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 8px;
          }
          .details-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
          }
          .details-row:last-child {
            margin-bottom: 0;
          }
          .details-label {
            font-weight: 500;
            color: #777777;
          }
          .details-value {
            font-weight: 600;
            color: #111111;
            text-align: right;
          }
          .next-steps {
            margin-bottom: 30px;
          }
          .next-steps h3 {
            font-size: 16px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 15px;
            color: #111111;
          }
          .step-item {
            display: flex;
            margin-bottom: 15px;
          }
          .step-number {
            background-color: #D4AF37;
            color: #000000;
            font-weight: bold;
            font-size: 12px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .step-content {
            font-size: 14px;
            line-height: 1.5;
            color: #555555;
          }
          .footer {
            background-color: #fafafa;
            border-top: 1px solid #eaeaea;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #999999;
          }
          .footer a {
            color: #D4AF37;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ask Array Tech</h1>
            <span>Startup Launch Support</span>
          </div>
          <div class="content">
            <p class="greeting">Hello ${name},</p>
            <p class="intro-text">
              Your consultation slot is successfully booked and your payment is confirmed. We are excited to partner with you and help you launch your venture.
            </p>

            <div class="details-card">
              <div class="details-title">Booking Details</div>
              <div class="details-row">
                <div class="details-label">Service:</div>
                <div class="details-value">${service_needed || 'Startup Consultation'}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Date:</div>
                <div class="details-value">${slotDate}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Time:</div>
                <div class="details-value">${slotTime}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Amount Paid:</div>
                <div class="details-value">₹${amount || '399.00'}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Ref ID:</div>
                <div class="details-value">${bookingId}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Status:</div>
                <div class="details-value" style="color: #2e7d32;">Paid & Confirmed</div>
              </div>
            </div>

            <div class="next-steps">
              <h3>Next Steps</h3>
              <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-content">
                  <strong>Calendar invitation:</strong> A calendar invitation with a Google Meet link will be sent to this email address shortly.
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-content">
                  <strong>Session prep:</strong> Have your business plans, slide decks, or technical questions ready so we can dive straight into execution.
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-content">
                  <strong>Support:</strong> Need to reschedule or ask questions ahead of time? Write to us directly at <a href="mailto:founders@askarray.in">founders@askarray.in</a>.
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Serious Founders Don't Wait To Start.</p>
            <p>&copy; ${new Date().getFullYear()} Ask Array Tech. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Ask Array Tech" <${sender}>`,
      to: email,
      subject: `Booking Confirmed: Startup Consultation with Ask Array Tech`,
      html: htmlContent,
    });

    console.log(`Booking confirmation email sent to ${email} for booking: ${bookingId}`);
  } catch (err) {
    console.error('Failed to send booking confirmation email:', err);
  }
}
