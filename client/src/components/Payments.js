import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from './../actions';


// amount = amount must be USD cent value
// token = token expecting to receieve a callback function. And that callback function will be called, after we've successfully receieved a authorization token from Stripe API server. Or, in other word, when we will successfully receieved a authorization token from Stripe API server, then this callback function will be get called. This authorization token includes the information of charges.

// How token object looks -> https://stripe.com/docs/api#charges
// {
// "id": "tok_1C0PsmCvNfbYVhmXYhTrIUs8", // It's the unique identification of credit card. It'll be passed to source
// "object": "token",
// "card": {
//     "id": "card_1C0PslCvNfbYVhmXAn5k02bg",
//     "object": "card",
//     "address_city": null,
//     "address_country": null,
//     "address_line1": null,
//     "address_line1_check": null,
//     "address_line2": null,
//     "address_state": null,
//     "address_zip": null,
//     "address_zip_check": null,
//     "brand": "Visa",
//     "country": "US",
//     "cvc_check": "pass",
//     "dynamic_last4": null,
//     "exp_month": 10,
//     "exp_year": 2020,
//     "funding": "credit",
//     "last4": "4242",
//     "metadata": {},
//     "name": "asdasda@haa.com",
//     "tokenization_method": null
// },
// "client_ip": "103.230.211.42",
// "created": 1519804908,
// "email": "asdasda@haa.com",
// "livemode": false,
// "type": "card",
// "used": false
// }

// id: "tok_1C01bICvNfbYVhmXCtWTwb5T" -> We care about this id. It represents the pending charge.

class Payments extends Component {
    render() {
        return (
            <ReactStripeCheckout
                name="Emaily"
                description="$5 for 5 surveys"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add credit</button>
            </ReactStripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);