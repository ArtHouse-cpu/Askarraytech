import { BizrvLeadModel } from '../models/index.js';
import { nowIso, generateId } from '../utils/index.js';
import { parseBizrvLeadInput } from '../utils/bizrvLead.js';

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
    const parsed = parseBizrvLeadInput(req.body || {});
    if (parsed.error) {
      return res.status(400).json({ detail: parsed.error });
    }

    const result = await BizrvLeadModel.create({
      id: generateId(),
      ...parsed.lead,
      paymentStatus: 'unpaid',
      created_at: nowIso(),
    });

    res.status(201).json(toPublicLead(result));
  } catch (err) {
    console.error('createBizrvLead failed:', err);
    res.status(400).json({ detail: err?.message || 'Invalid data' });
  }
};

export { getBizrvLead, createBizrvLead };
