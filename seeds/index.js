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

    await Cart.create({
        user: "63c91b7e8203b4cb073ae814",
        products: [
            {
                product: "63c91b49cc428e962497e29e",
                quantity: 2,
            },
            {
                product: "63c91b49cc428e962497e294",
                quantity: 5,
            },
        ]
    })

    mongoose.disconnect()


}

seedDB()