require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

//Routes request ka address define karte hain. for ex- get and post.
//Controller main logic handle karta hai. Yeh request ko process karta hai aur database se data lekar response bhejta hai

const app = express();
// Middleware: functions-> execute in between req and res .
//CORS-> Cross Origin Resource Sharing
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))

//Flow: Routes → Controller → Model
//Routes: Yeh sirf endpoints define karte hain (e.g., /api/items).
// Mount routes

app.use('/api/items', itemRoutes);
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));