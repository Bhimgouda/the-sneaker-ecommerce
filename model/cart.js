const mongoose = require("mongoose");
const {Schema} = mongoose;

const cartSchema = new Schema({
    _id: false,
    user: String,
    items: [
        {   
            _id: false,
            quantity: Number,
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            }
        }
    ]
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;