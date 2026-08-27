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

export const parseBizrvLeadInput = (body = {}) => {
  const businessName = firstStr(body.businessName);
  const ownerName = firstStr(body.ownerName, body.fullName, body.yourName);
  const phone = firstStr(body.phone, body.phoneNumber, body.whatsapp);
  const email = firstStr(body.email, body.businessEmail).toLowerCase();
  const city = firstStr(body.city);
  const businessStage = STAGE_ALIASES[firstStr(body.businessStage, body.businessType).toLowerCase()] || '';
  const preferredModel = MODEL_ALIASES[firstStr(body.preferredModel, body.pricingChoice).toLowerCase()] || '';
  const source = firstStr(body.source) || 'get_started_modal';

  const errors = [];
  if (!businessName || !ownerName || !phone || !email || !businessStage || !preferredModel) {
    errors.push('businessName, ownerName, phone, email, businessStage, and preferredModel are required');
  }
  if (businessStage && !BUSINESS_STAGES.includes(businessStage)) {
    errors.push('businessStage must be new or existing');
  }
  if (preferredModel && !PREFERRED_MODELS.includes(preferredModel)) {
    errors.push('preferredModel must be commit, flex, or prepaid');
  }

  return {
    error: errors[0] || null,
    lead: {
      businessName,
      ownerName,
      phone,
      email,
      city: city || null,
      businessStage,
      preferredModel,
      source,
    },
  };
};
