const nameValidator = (name) => name.length >= 20 && name.length <= 60;
const addressValidator = (address) => address.length <= 400;
const passwordValidator = (password) => /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password);
const emailValidator = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

module.exports = { nameValidator, addressValidator, passwordValidator, emailValidator };
