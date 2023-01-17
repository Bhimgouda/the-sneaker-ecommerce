const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    name: String,
    companyName: String,
    originalPrice: Number,
    discountedPrice: Number,
    desc: String,
    images: Array,
    category: String,
    rating:{
        rate: Number,
        count: Number,
    },
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;