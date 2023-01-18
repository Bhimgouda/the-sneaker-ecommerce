if(process.env.NODE_ENV !== "production") require("dotenv").config()
const mongoose = require("mongoose");
const { validate } = require("../model/cart");
const Cart = require("../model/cart");
const Product = require("../model/product");

const dbUrl = process.env.MONGODB_URI;
const products = require("./products.json")

mongoose.set("strictQuery", false)
mongoose.connect(dbUrl).then

const seedDB = async()=>{

    await Product.deleteMany()

    await Product.insertMany(products)

    mongoose.disconnect()

}

seedDB()