const db = require('../db');

function requireAdmin(req, res) {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Admin role required' });
    return false;
  }
  return true;
}

exports.listUsers = (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const users = db.prepare('SELECT id, email, name, role FROM users ORDER BY id DESC').all();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.promoteUser = (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  try {
    const info = db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(id);
    if (info.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listLeads = (req, res) => {
  if (!requireAdmin(req, res)) return;
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(100, Number(req.query.pageSize) || 25);
  const offset = (page - 1) * pageSize;
  try {
    const leads = db.prepare('SELECT id, provider, provider_lead_id, campaign, name, email, phone, city, created_at FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?').all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(1) as cnt FROM leads').get().cnt;
    res.json({ leads, page, pageSize, total });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLead = (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  const { name, email, phone, city, campaign } = req.body || {};
  try {
    const { validateLead, normalizePhone } = require('../utils/validation');
    const leadCandidate = {
      provider: 'manual',
      provider_lead_id: `manual-${id}`,
      name: name || null,
      email: email || null,
      phone: phone ? normalizePhone(phone) : null,
      city: city || null,
      campaign: campaign || null,
      raw: { updated_by: req.user.email }
    };
    const v = validateLead(leadCandidate);
    const validFlag = v.valid ? 1 : 0;
    const errors = v.errors.length ? JSON.stringify(v.errors) : null;
    const info = db.prepare('UPDATE leads SET name = ?, email = ?, phone = ?, city = ?, campaign = ?, valid = ?, validation_errors = ? WHERE id = ?').run(leadCandidate.name, leadCandidate.email, leadCandidate.phone, leadCandidate.city, leadCandidate.campaign, validFlag, errors, id);
    if (info.changes === 0) return res.status(404).json({ message: 'Lead not found' });
    const updated = db.prepare('SELECT id, provider, provider_lead_id, campaign, name, email, phone, city, valid, validation_errors, created_at FROM leads WHERE id = ?').get(id);
    res.json({ lead: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
