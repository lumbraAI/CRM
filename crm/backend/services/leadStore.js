const db = require('../db');

const insert = db.prepare(`INSERT OR IGNORE INTO leads (provider, provider_lead_id, campaign, name, email, phone, city, raw_payload, valid, validation_errors) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const updateIfIgnored = db.prepare(`UPDATE leads SET campaign=?, name=?, email=?, phone=?, city=?, raw_payload=?, valid=?, validation_errors=? WHERE provider=? AND provider_lead_id=?`);

function saveLead(lead) {
  const validFlag = lead.valid === false ? 0 : 1;
  const errors = lead.validation_errors ? JSON.stringify(lead.validation_errors) : null;
  const info = insert.run(lead.provider, lead.provider_lead_id, lead.campaign || null, lead.name || null, lead.email || null, lead.phone || null, lead.city || null, JSON.stringify(lead.raw || {}), validFlag, errors);
  if (info.changes === 0) {
    // already existed — update with latest info
    updateIfIgnored.run(lead.campaign || null, lead.name || null, lead.email || null, lead.phone || null, lead.city || null, JSON.stringify(lead.raw || {}), validFlag, errors, lead.provider, lead.provider_lead_id);
    return { inserted: false };
  }
  return { inserted: true, id: info.lastInsertRowid };
}

module.exports = { saveLead };
