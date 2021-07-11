const Stripe = require('stripe');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
});

// Send stripe API KEY => /api/v1/stripeapi
exports.sendStripeAPI = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});