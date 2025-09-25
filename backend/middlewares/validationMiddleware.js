const { nameValidator, addressValidator, passwordValidator, emailValidator } = require('../utils/validators');

const validateUser = (req, res, next) => {
    const { name, email, password, address } = req.body;

    if (!nameValidator(name)) return res.status(400).json({ message: 'Name must be 20-60 characters.' });
    if (!emailValidator(email)) return res.status(400).json({ message: 'Invalid email format.' });
    if (!passwordValidator(password)) return res.status(400).json({ message: 'Password must be 8-16 chars with uppercase & special char.' });
    if (!addressValidator(address)) return res.status(400).json({ message: 'Address max 400 characters.' });

    next();
};

module.exports = { validateUser };
