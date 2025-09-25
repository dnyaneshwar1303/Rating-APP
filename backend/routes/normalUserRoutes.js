const express = require('express');
const router = express.Router();
const { signUp, updatePassword, getStores, submitRating } = require('../controllers/normalUserController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateUser } = require('../middlewares/validationMiddleware');

// Public route
router.post('/signup', validateUser, signUp);

// Authenticated routes
router.use(authenticate);

router.put('/update-password', updatePassword);
router.get('/stores', getStores);
router.post('/stores/rate', submitRating);

module.exports = router;
