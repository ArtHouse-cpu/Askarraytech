// @ts-nocheck
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserModel, PortfolioModel } from './models';
import { nowIso } from './utils';
import { v4 as uuidv4 } from 'uuid';
import routes from './routes';
import { stripeWebhook } from './controllers/paymentController';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true,
}));

// Webhook must be parsed as raw body, so it's placed before express.json()
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());

// Main Routes
app.use('/api', routes);

// Database Seeding Logic
const DEFAULT_PORTFOLIO = [
  {
      key: "loomly-ops",
      type: "SaaS · B2B",
      name: "Loomly Ops",
      blurb: "Workflow automation SaaS — built MVP, brand & launch funnel.",
      metric: "₹6.2L MRR in 90 days",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      visible: true,
      order: 1,
  },
  {
      key: "maaty-roots",
      type: "D2C · Wellness",
      name: "Maaty Roots",
      blurb: "Ayurvedic D2C — incorporation, GST, Shopify build, Meta ads live.",
      metric: "3,400 orders in 45 days",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      visible: true,
      order: 2,
  },
  {
      key: "tradera",
      type: "Mobile · Marketplace",
      name: "Tradera",
      blurb: "iOS + Android marketplace MVP, admin dashboard, launch playbook.",
      metric: "12k installs · week 1",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      visible: true,
      order: 3,
  },
  {
      key: "studio-forge",
      type: "Creator · Edu",
      name: "Studio Forge",
      blurb: "Creator-led cohort program — branding, web, payment infra.",
      metric: "₹14L in first cohort",
      image: "https://images.unsplash.com/photo-1702468049239-49fd1cf99d20?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      visible: true,
      order: 4,
  },
  {
      key: "nine-north",
      type: "Agency · Branding",
      name: "Nine & North",
      blurb: "Brand identity + LinkedIn engine for a boutique agency.",
      metric: "42 inbound leads / mo",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      visible: true,
      order: 5,
  },
  {
      key: "kavach-pay",
      type: "Fintech · MVP",
      name: "Kavach Pay",
      blurb: "Payment ops dashboard MVP — design system, deployment, AI assist.",
      metric: "Pilot live in 28 days",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      visible: true,
      order: 6,
  },
];

const seedAdmin = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await UserModel.findOne({ email: adminEmail });
  if (!existing) {
    await UserModel.create({
      id: uuidv4(),
      email: adminEmail,
      password_hash: await bcrypt.hash(adminPassword, 10),
      role: 'admin',
      name: 'Admin User',
      created_at: nowIso()
    });
    console.log(`Seeded admin user ${adminEmail}`);
  } else if (!existing.password_hash || !(await bcrypt.compare(adminPassword, existing.password_hash))) {
    await UserModel.updateOne({ email: adminEmail }, { 
      $set: { 
        password_hash: await bcrypt.hash(adminPassword, 10),
        role: 'admin'
      } 
    });
    console.log(`Updated admin password for ${adminEmail}`);
  }
};

const seedPortfolio = async () => {
  for (const item of DEFAULT_PORTFOLIO) {
    const existing = await PortfolioModel.findOne({ key: item.key });
    if (!existing) {
      await PortfolioModel.create({ ...item, created_at: nowIso() });
    }
  }
  console.log('Portfolio seed checked');
};

const startServer = async () => {
  try {
    if (!process.env.MONGO_URL || !process.env.DB_NAME) {
      throw new Error('MONGO_URL and DB_NAME must be set');
    }
    await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    console.log('Connected to MongoDB');
    
    await seedAdmin();
    await seedPortfolio();
  app.get("/", (req, res) => {
  res.send("🚀 Server is live and running...");
  });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
