const express = require('express');
const router = express.Router();
const { addUser, getUsers, getUserById } = require('../controllers/userController');
const { validateUser } = require('../middlewares/validationMiddleware');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.use(authenticate, adminOnly);

router.post('/', validateUser, addUser);
router.get('/', getUsers);
router.get('/:id', getUserById);


module.exports = router;
