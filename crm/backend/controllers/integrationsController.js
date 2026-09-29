const express = require('express');
const bodyParser = require('body-parser');
const { verifySignature } = require('../services/facebookClient');
const tiktok = require('../services/tiktokClient');
const google = require('../services/googleClient');
const whatsapp = require('../services/whatsappClient');
const leadStore = require('../services/leadStore');
const { isEmail, normalizePhone, validateLead } = require('../utils/validation');

// For Meta (Facebook/Instagram/WhatsApp) webhooks we need raw body for signature
const metaRawParser = bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } });

exports.metaWebhook = async (req, res) => {
  const sig = req.headers['x-hub-signature-256'] || '';
  if (!verifySignature(req.rawBody, sig, process.env.META_APP_SECRET || '')) return res.status(403).send('invalid signature');
  // Extract lead info from payload (this is provider-specific)
  try {
    const body = req.body || {};
    // naive extraction: try multiple possible shapes
    const lead = {
      provider: 'meta',
      provider_lead_id: body.entry && body.entry[0] && body.entry[0].id || (body.lead && body.lead.id) || null,
      campaign: null,
      name: body.name || null,
      email: body.email || null,
      phone: normalizePhone(body.phone || (body.msisdn && body.msisdn.number) || null),
      raw: body
    };
    const v = validateLead(lead);
    lead.valid = v.valid;
    lead.validation_errors = v.errors.length ? v.errors : null;
    leadStore.saveLead(lead);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.tiktokWebhook = async (req, res) => {
  try {
    const body = req.body || {};
    const parsed = await tiktok.parseLeadFromWebhook(body);
    parsed.provider = 'tiktok';
    parsed.email = parsed.email || null;
    parsed.phone = normalizePhone(parsed.phone || null);
    const v2 = validateLead(parsed);
    parsed.valid = v2.valid;
    parsed.validation_errors = v2.errors.length ? v2.errors : null;
    leadStore.saveLead(parsed);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.googleWebhook = async (req, res) => {
  try {
    const body = req.body || {};
    const parsed = await google.parseGoogleLead(body);
    parsed.provider = 'google';
    parsed.email = parsed.email || null;
    parsed.phone = normalizePhone(parsed.phone || null);
    const v3 = validateLead(parsed);
    parsed.valid = v3.valid;
    parsed.validation_errors = v3.errors.length ? v3.errors : null;
    leadStore.saveLead(parsed);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.whatsappWebhook = async (req, res) => {
  try {
    const body = req.body || {};
    const parsed = await whatsapp.parseWhatsAppLead(body);
    parsed.provider = 'whatsapp';
    parsed.phone = normalizePhone(parsed.phone || null);
    const v4 = validateLead(parsed);
    parsed.valid = v4.valid;
    parsed.validation_errors = v4.errors.length ? v4.errors : null;
    leadStore.saveLead(parsed);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.metaRawParser = metaRawParser;
