const connection = require('../db');

// Add new store
const addStore = (req, res) => {
    const { name, email, address } = req.body;
    connection.query(
        'INSERT INTO stores (name, email, address) VALUES (?, ?, ?)',
        [name, email, address],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'Store added successfully', storeId: result.insertId });
        }
    );
};

// Get all stores with optional filters & sorting
const getStores = (req, res) => {
    let { name, email, address, sortField = 'name', sortOrder = 'ASC' } = req.query;
    let query = 'SELECT id, name, email, address, rating FROM stores WHERE 1=1';
    const params = [];

    if (name) { query += ' AND name LIKE ?'; params.push(`%${name}%`); }
    if (email) { query += ' AND email LIKE ?'; params.push(`%${email}%`); }
    if (address) { query += ' AND address LIKE ?'; params.push(`%${address}%`); }

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    connection.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// Dashboard
const getDashboard = (req, res) => {
    const dashboardData = {};
    connection.query('SELECT COUNT(*) as totalUsers FROM users', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        dashboardData.totalUsers = results[0].totalUsers;

        connection.query('SELECT COUNT(*) as totalStores FROM stores', (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            dashboardData.totalStores = results[0].totalStores;

            connection.query('SELECT COUNT(*) as totalRatings FROM ratings', (err, results) => {
                if (err) return res.status(500).json({ message: err.message });
                dashboardData.totalRatings = results[0].totalRatings;

                res.json(dashboardData);
            });
        });
    });
};

module.exports = { addStore, getStores, getDashboard };
