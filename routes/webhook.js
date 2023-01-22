const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync")
const express = require("express");
const User = require("../model/user");
const Cart = require("../model/cart");
const router = express.Router();
// When the stripe checkout session finishes, we can get the checkout session details, order details and much more from stipe webhook
// It is a set of events that gets fired when a user proceeds from checkout session and has all the data of the order processed(success or fail)

router.post("/", express.raw({type:"application/json"}), catchAsync(async(req,res)=>{
    const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

    // Generating certificate for verifying authentication of webhook that we get from stripe
    const sign = req.headers['stripe-signature'];

    let event;

    // Here we are verifying that the event came from stripe
    event = stripe.webhooks.constructEvent(req.body, sign, endPointSecret)

    // Handle the checkout.session.completed event
    if(event.type==="checkout.session.completed"){
        const session = event.data.object;
        // Fulfill the order...
        fulfillTheOrder(session)
    }

    // This sends status code of 200 to acknowledge receipt of the event
    res.send();
}))

async function fulfillTheOrder(session){
    const user = await User.findOne({email: session.metadata.email});
    user.orders.push({
        _id:session.id,
        orderAmount: session.amount_total/100,
        shippingAmount: session.total_details.amount_shipping /100,
        shippingAddress: session.shipping_details.address,
        orderDate: new Date().toUTCString().slice(5,16),
        images: JSON.parse(session.metadata.images),
    })
    await Cart.findOneAndUpdate({user: user._id}, {items:[]})
    await user.save();
}

module.exports = router;