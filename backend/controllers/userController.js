const connection = require('../db');
const bcrypt = require('bcrypt');

// Add new user (normal/admin)
const addUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, address, role],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'User added successfully', userId: result.insertId });
        }
    );
};

// Get all users with optional filters & sorting
const getUsers = (req, res) => {
    let { name, email, address, role, sortField = 'name', sortOrder = 'ASC' } = req.query;
    let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
    const params = [];

    if (name) { query += ' AND name LIKE ?'; params.push(`%${name}%`); }
    if (email) { query += ' AND email LIKE ?'; params.push(`%${email}%`); }
    if (address) { query += ' AND address LIKE ?'; params.push(`%${address}%`); }
    if (role) { query += ' AND role = ?'; params.push(role); }

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    connection.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// Get single user details
const getUserById = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT id, name, email, address, role FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
};

module.exports = { addUser, getUsers, getUserById };
