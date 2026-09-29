const express = require('express');
const router = express.Router();
const { listUsers, promoteUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/admin/users - require auth + admin role
router.get('/users', authMiddleware, listUsers);

// GET /api/admin/leads - list leads (admin)
router.get('/leads', authMiddleware, require('../controllers/adminController').listLeads);
// PUT /api/admin/leads/:id - update a lead (admin)
router.put('/leads/:id', authMiddleware, require('../controllers/adminController').updateLead);

// POST /api/admin/users/:id/promote - promote user to admin (only admin can call)
router.post('/users/:id/promote', authMiddleware, promoteUser);

module.exports = router;
