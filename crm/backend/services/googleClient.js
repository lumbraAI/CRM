// Google Ads / Lead Form stub
async function parseGoogleLead(body) {
  // Map provider payload to lead structure
  return {
    provider_lead_id: body.leadId || null,
    campaign: body.campaignName || null,
    name: body.fullName || null,
    email: body.email || null,
    phone: body.phone || null,
    city: body.city || null,
    raw: body
  };
}

module.exports = { parseGoogleLead };
