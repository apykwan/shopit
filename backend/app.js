const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload'); 
const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');

const errorMiddleware = require('./middlewares/errors');
// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes
app.use('/api/v1', auth);
app.use('/api/v1', products);
app.use('/api/v1', order);
app.use('/api/v1', payment);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;