const express = require("express");
const Cart = require("../model/cart");
const Product = require("../model/product");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router.get("/", catchAsync(async(req,res)=>{
    const userId = req.session.user_id;
    let cart = await Cart.findOne({user: userId}).populate("items.product");
    cart = JSON.stringify(cart.items)
    return res.send(cart)
}))

module.exports = router;
