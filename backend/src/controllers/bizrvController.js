import { BizrvLeadModel } from '../models/index.js';
import { nowIso, generateId } from '../utils/index.js';

const BUSINESS_STAGES = ['new', 'existing'];
const PREFERRED_MODELS = ['commit', 'flex', 'prepaid'];

const STAGE_ALIASES = {
  new: 'new',
  existing: 'existing',
  new_business: 'new',
  existing_business: 'existing',
  'new business': 'new',
  'existing business': 'existing',
};

const MODEL_ALIASES = {
  commit: 'commit',
  flex: 'flex',
  prepaid: 'prepaid',
  postpaid_commit: 'commit',
  postpaid_flex: 'flex',
  'commit (1%)': 'commit',
  'flex (0.5%)': 'flex',
};

const str = (value) => (value == null ? '' : String(value).trim());

const firstStr = (...values) => {
  for (const value of values) {
    const next = str(value);
    if (next) return next;
  }
  return '';
};

const toPublicLead = (doc) => {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc.toObject ? doc.toObject() : doc;
  return rest;
};

const getBizrvLead = async (req, res) => {
  try {
    const items = await BizrvLeadModel.find({}, { _id: 0, __v: 0 }).sort({ created_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ detail: 'Failed to fetch BizRV leads' });
  }
};

const createBizrvLead = async (req, res) => {
  try {
    const body = req.body || {};

    const businessName = firstStr(body.businessName);
    const ownerName = firstStr(body.ownerName, body.fullName, body.yourName);
    const phone = firstStr(body.phone, body.phoneNumber, body.whatsapp);
    const email = firstStr(body.email, body.businessEmail).toLowerCase();
    const city = firstStr(body.city);

    const businessStage = STAGE_ALIASES[
      firstStr(body.businessStage, body.businessType).toLowerCase()
    ] || '';
    const preferredModel = MODEL_ALIASES[
      firstStr(body.preferredModel, body.pricingChoice).toLowerCase()
    ] || '';

    if (!businessName || !ownerName || !phone || !email || !businessStage || !preferredModel) {
      return res.status(400).json({
        detail: 'businessName, ownerName, phone, email, businessStage, and preferredModel are required',
      });
    }

    if (!BUSINESS_STAGES.includes(businessStage)) {
      return res.status(400).json({
        detail: 'businessStage must be new or existing',
      });
    }

    if (!PREFERRED_MODELS.includes(preferredModel)) {
      return res.status(400).json({
        detail: 'preferredModel must be commit, flex, or prepaid',
      });
    }

    const result = await BizrvLeadModel.create({
      id: generateId(),
      businessName,
      ownerName,
      phone,
      email,
      city: city || null,
      businessStage,
      preferredModel,
      source: firstStr(body.source) || 'get_started_modal',
      created_at: nowIso(),
    });

    res.status(201).json(toPublicLead(result));
  } catch (err) {
    console.error('createBizrvLead failed:', err);
    res.status(400).json({ detail: err?.message || 'Invalid data' });
  }
};

export { getBizrvLead, createBizrvLead };
