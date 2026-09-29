// TikTok client stub (expand with OAuth / API calls as needed)
async function parseLeadFromWebhook(body) {
  // adapt according to TikTok webhook payload structure
  // return an object: { provider_lead_id, campaign, name, email, phone, city, raw }
  return {
    provider_lead_id: body.id || (body.lead && body.lead.id) || null,
    campaign: body.campaign || null,
    name: body.name || null,
    email: body.email || null,
    phone: body.phone || null,
    city: body.city || null,
    raw: body
  };
}

module.exports = { parseLeadFromWebhook };
