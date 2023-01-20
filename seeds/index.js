if(process.env.NODE_ENV !== "production") require("dotenv").config()
const mongoose = require("mongoose");
const Cart = require("../model/cart");
const Product = require("../model/product");
const User = require("../model/user");

const dbUrl = process.env.MONGODB_URI;
const products = require("./products.json")

mongoose.set("strictQuery", false)
mongoose.connect(dbUrl).then

const seedDB = async()=>{

    // await Product.deleteMany()

    // await User.deleteMany({})

    // await Product.insertMany(products)

    await Cart.deleteMany({})
    await User.deleteMany({})

    mongoose.disconnect()


}

seedDB()