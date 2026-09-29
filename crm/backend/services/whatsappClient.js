// WhatsApp Business webhook stub
async function parseWhatsAppLead(body) {
  // Map WhatsApp message payload to lead fields where possible
  // Example: text messages often need additional parsing to extract data
  return {
    provider_lead_id: (body.entry && body.entry[0] && body.entry[0].id) || null,
    campaign: null,
    name: (body.contact && body.contact.name) || null,
    email: null,
    phone: (body.phone_number) || null,
    city: null,
    raw: body
  };
}

module.exports = { parseWhatsAppLead };
