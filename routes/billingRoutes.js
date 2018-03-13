const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('./../middlewares/requireLogin');

// https://stripe.com/docs/api/node#create_charge
module.exports = function (app) {
    // Hey Express, If anytime some1 makes a POST request to this "/api/stripe" route, Here's a reference to a function "requireLogin". "requireLogin" will run whenever a request comes in. So, Express takes the reference of this function. And calls it internally when a request to "/api/stripe" route comes in the application.
    // 1st the request will come to "/api/stripe" route. Then "requireLogin" will be invoked. Then the callback function will be called.
    // We can pass as many function as middleware.
    app.post('/api/stripe', requireLogin, async function (req, res) {

        // console.log(req.body);
        const charge = await stripe.charges.create({
            amount: 800,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
        // console.log(charge);
        // console.log(req.user);
    });
};


// module.exports = function (app) {
//     app.post('/api/stripe', function (req, res) {
//         // console.log(req.body);
//         stripe.charges.create({
//             amount: 500,
//             currency: 'usd',
//             description: '$5 for 5 credits',
//             source: req.body.id
//         });
//     });
// };


// Generated charge object

// { id: 'ch_1C0TJ0CvNfbYVhmXaom59XWe',
//    object: 'charge',
//    amount: 500,
//    amount_refunded: 0,
//    application: null,
//    application_fee: null,
//    balance_transaction: 'txn_1C0TJ0CvNfbYVhmXp5UWQiZQ',
//    captured: true,
//    created: 1519818066,
//    currency: 'usd',
//    customer: null,
//    description: '$5 for 5 credits',
//    destination: null,
//    dispute: null,
//    failure_code: null,
//    failure_message: null,
//    fraud_details: {},
//    invoice: null,
//    livemode: false,
//    metadata: {},
//    on_behalf_of: null,
//    order: null,
//    outcome: {
//       network_status: 'approved_by_network',
//       reason: null,
//       risk_level: 'normal',
//       seller_message: 'Payment complete.',
//       type: 'authorized'
//    },
//    paid: true,
//    receipt_email: null,
//    receipt_number: null,
//    refunded: false,
//    refunds: {
//       object: 'list',
//       data: [],
//       has_more: false,
//       total_count: 0,
//       url: '/v1/charges/ch_1C0TJ0CvNfbYVhmXaom59XWe/refunds'
//    },
//    review: null,
//    shipping: null,
//    source: {
//       id: 'card_1C0TIvCvNfbYVhmXxQyUnE21',
//       object: 'card',
//       address_city: null,
//       address_country: null,
//       address_line1: null,
//       address_line1_check: null,
//       address_line2: null,
//       address_state: null,
//       address_zip: null,
//       address_zip_check: null,
//       brand: 'Visa',
//       country: 'US',
//       customer: null,
//       cvc_check: 'pass',
//       dynamic_last4: null,
//       exp_month: 10,
//       exp_year: 2020,
//       fingerprint: 'e7IQdC2IwOmrn8R3',
//       funding: 'credit',
//       last4: '4242',
//       metadata: {},
//       name: 'asdasd@kaj.com',
//       tokenization_method: null
//     },
//    source_transfer: null,
//    statement_descriptor: null,
//    status: 'succeeded',
//    transfer_group: null
// }