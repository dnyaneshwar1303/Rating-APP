const connection = require('../db');
const bcrypt = require('bcrypt');

// Sign up
const signUp = async (req, res) => {
    const { name, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, address, 'normal'],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'User registered successfully', userId: result.insertId });
        }
    );
};

// Update password
const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    connection.query('SELECT password FROM users WHERE id = ?', [userId], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, results[0].password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        connection.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'Password updated successfully' });
        });
    });
};

// Get list of stores with user's submitted rating
const getStores = (req, res) => {
    const userId = req.user.id;
    let { name, address, sortField = 'name', sortOrder = 'ASC' } = req.query;

    let query = `
        SELECT s.id, s.name, s.address, s.rating AS overallRating, 
        r.rating AS userRating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id AND r.user_id = ?
        WHERE 1=1
    `;
    const params = [userId];

    if (name) { query += ' AND s.name LIKE ?'; params.push(`%${name}%`); }
    if (address) { query += ' AND s.address LIKE ?'; params.push(`%${address}%`); }

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    connection.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// Submit or update rating
const submitRating = (req, res) => {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be 1-5' });

    // Check if user already submitted rating
    connection.query('SELECT id FROM ratings WHERE user_id = ? AND store_id = ?', [userId, storeId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        if (results.length > 0) {
            // Update existing rating
            connection.query('UPDATE ratings SET rating = ? WHERE id = ?', [rating, results[0].id], (err) => {
                if (err) return res.status(500).json({ message: err.message });
                updateStoreOverallRating(storeId, res);
            });
        } else {
            // Insert new rating
            connection.query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)', [userId, storeId, rating], (err) => {
                if (err) return res.status(500).json({ message: err.message });
                updateStoreOverallRating(storeId, res);
            });
        }
    });
};

// Helper function to recalculate store's overall rating
const updateStoreOverallRating = (storeId, res) => {
    connection.query('SELECT AVG(rating) AS avgRating FROM ratings WHERE store_id = ?', [storeId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        const overall = results[0].avgRating || 0;
        connection.query('UPDATE stores SET rating = ? WHERE id = ?', [overall, storeId], (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'Rating submitted successfully', overallRating: overall });
        });
    });
};

module.exports = { signUp, updatePassword, getStores, submitRating };
