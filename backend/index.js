const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const normalUserRoutes = require('./routes/normalUserRoutes');
const storeOwnerRoutes = require('./routes/storeOwnerRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/stores', storeRoutes);

// Normal User routes
app.use('/api/user', normalUserRoutes);

// Store Owner routes
app.use('/api/store-owner', storeOwnerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
