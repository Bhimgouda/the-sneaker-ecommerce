const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    name: String,
    companyName: String,
    originalPrice: Number,
    discountedPrice: Number,
    desc: String,
    images: Array,
    categorey: String,
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;