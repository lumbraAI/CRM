const express = require('express');
const router = express.Router();
const controller = require('../controllers/integrationsController');

// Meta (Facebook/Instagram/WhatsApp) webhook: needs raw body for signature
router.post('/meta/webhook', controller.metaRawParser, controller.metaWebhook);

// TikTok webhook
router.post('/tiktok/webhook', express.json(), controller.tiktokWebhook);

// Google webhook
router.post('/google/webhook', express.json(), controller.googleWebhook);

// WhatsApp webhook (also via Meta platform sometimes)
router.post('/whatsapp/webhook', express.json(), controller.whatsappWebhook);

module.exports = router;
