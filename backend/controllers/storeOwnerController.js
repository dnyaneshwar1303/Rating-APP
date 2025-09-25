const connection = require('../db');
const bcrypt = require('bcrypt');

// Update password
const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    connection.query('SELECT password FROM users WHERE id = ? AND role = "store_owner"', [userId], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Store Owner not found' });

        const isMatch = await bcrypt.compare(oldPassword, results[0].password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        connection.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'Password updated successfully' });
        });
    });
};

// Dashboard: list of users who rated their store + average rating
const getDashboard = (req, res) => {
    const userId = req.user.id;

    // First get the store owned by this user
    connection.query('SELECT * FROM stores WHERE id = (SELECT store_id FROM users WHERE id = ?)', [userId], (err, storeResults) => {
        if (err) return res.status(500).json({ message: err.message });
        if (storeResults.length === 0) return res.status(404).json({ message: 'No store assigned to this owner' });

        const storeId = storeResults[0].id;

        // Get all ratings for this store
        connection.query(`
            SELECT u.name AS userName, r.rating 
            FROM ratings r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.store_id = ?`, [storeId], (err, ratingResults) => {
            if (err) return res.status(500).json({ message: err.message });

            // Calculate average rating
            let avgRating = 0;
            if (ratingResults.length > 0) {
                const total = ratingResults.reduce((acc, curr) => acc + curr.rating, 0);
                avgRating = (total / ratingResults.length).toFixed(2);
            }

            res.json({
                storeName: storeResults[0].name,
                averageRating: parseFloat(avgRating),
                ratings: ratingResults
            });
        });
    });
};

module.exports = { updatePassword, getDashboard };
