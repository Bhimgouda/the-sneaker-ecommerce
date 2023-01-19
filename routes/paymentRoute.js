const express = require("express");
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", isLoggedIn, catchAsync(async(req,res)=>{
    const {items, email} = req.body;

    // Transforming the items array into formal manner in which stripe understands
    const transformedItems = items.map(item=>{
        console.log(item)
        return {
            quantity:item.quantity,
            price_data: {
                currency: "inr",
                unit_amount: item.originalPrice*100,
                product_data:{
                        description: `${item.desc.slice(0,55)}...`,
                        name: item.name,
                        images: item.images,
                }
            }
        }
    })


    // stripe Creating checkout session using
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
            {shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'inr'},
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 2},
                    maximum: {unit: 'business_day', value: 3},
                  },
                },
              },
        ],
        shipping_address_collection:{
            allowed_countries: ["IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.images[0])),
        }
    })

    return res.send(session.id)
}))

module.exports = router