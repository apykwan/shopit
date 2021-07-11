const express = require('express');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { 
    processPayment,
    sendStripeAPI
} = require('../controllers/paymentController');

const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeAPI);


module.exports = router;