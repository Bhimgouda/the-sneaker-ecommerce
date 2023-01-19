const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    profilePic: String,
    orders: [
        {
        _id: String,
        orderAmount: Number,
        shippingAmount: Number,
        shippingAddress: {},
        images: Array,
        orderDate: String,
        }
    ],
})

const User = mongoose.model("User", userSchema);

module.exports = User;