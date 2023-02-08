const express = require("express");
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", isLoggedIn, catchAsync(async(req,res)=>{
    const {items, email} = req.body;

    // Transforming the items array into formal manner in which stripe understands
    const transformedItems = items.map(item=>{
        return {
            quantity:item.quantity,
            price_data: {
                currency: "inr",
                unit_amount: item.product.discountedPrice*100, // For cents, paisa purposes
                product_data:{
                        description: `${item.product.desc.slice(0,55)}...`,
                        name: item.product.name,
                        images: item.product.images,
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
        success_url: `${process.env.CLIENT}/success`,
        cancel_url: `${process.env.CLIENT}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.product.images[0])),
        }
    })

    return res.send(session.id)
}))

module.exports = router