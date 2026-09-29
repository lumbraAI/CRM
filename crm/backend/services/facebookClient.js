// Minimal Facebook/Meta client stub for webhook verification
const crypto = require('crypto');

function verifySignature(rawBody, signature, appSecret) {
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
  return signature === `sha256=${hmac}`;
}

module.exports = { verifySignature };
