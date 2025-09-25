const express = require('express');
const router = express.Router();
const { addStore, getStores, getDashboard } = require('../controllers/storeController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.use(authenticate, adminOnly);

router.post('/', addStore);
router.get('/', getStores);
router.get('/dashboard', getDashboard);

module.exports = router;
