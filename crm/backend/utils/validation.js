function isEmail(email) {
  if (!email) return false;
  // simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone) {
  if (!phone) return null;
  // remove non digits, keep leading + if present
  const plus = phone.trim().startsWith('+') ? '+' : '';
  const digits = phone.replace(/[^0-9]/g, '');
  return plus + digits;
}

function validateLead(lead) {
  const errors = [];
  if (!lead.provider) errors.push('missing provider');
  if (!lead.provider_lead_id) errors.push('missing provider_lead_id');
  // at least one contact point
  if (!lead.email && !lead.phone && !lead.name) errors.push('no contact info (email/phone/name)');
  if (lead.email && !isEmail(lead.email)) errors.push('invalid email');
  return { valid: errors.length === 0, errors };
}

module.exports = { isEmail, normalizePhone, validateLead };
