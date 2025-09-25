const express = require('express');
const router = express.Router();
const { updatePassword, getDashboard } = require('../controllers/storeOwnerController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware'); // reuse authenticate
const { validateUser } = require('../middlewares/validationMiddleware');

// Authenticate only
router.use(authenticate);

// Update password
router.put('/update-password', updatePassword);

// Dashboard
router.get('/dashboard', getDashboard);

module.exports = router;
