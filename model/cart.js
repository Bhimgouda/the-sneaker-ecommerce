const mongoose = require("mongoose");
const {Schema} = mongoose;

const cartSchema = new Schema({
    user: String,
    items: [
        {   
            _id: false,
            quantity: Number,
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            }
        },
    ]
});

const MAX_ITEMS = 21;

cartSchema.path('items').validate(function (items) {
    return items.length <= MAX_ITEMS;
}, `Exceeded the maximum number of ${MAX_ITEMS} allowed items in the cart.`);


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;