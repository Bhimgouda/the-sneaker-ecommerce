const express = require("express");
const Cart = require("../model/cart");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router.get('/', catchAsync(async(req,res)=>{
    const user = req.session.user_id
    let cart = {}
    if(user){
        cart = await Cart.findOne({user}).populate("items.product");
    }
    else{
        cart = await Cart.findById(req.session.cart_id).populate("items.product");
    }
    res.send(cart)
}))

router.put('/', catchAsync(async(req,res)=>{
    const user = req.session.user_id;
    const item = req.body;
    let cart = {}
    if(user){
        cart = await Cart.findOne({user}).populate("items.product");
    }
    else{
        cart = await Cart.findById(req.session.cart_id).populate("items.product");
    }

    const itemIndex = cart.items.findIndex(i=>i.product._id == item.product._id);
    if(itemIndex!==-1){
        cart.items[itemIndex].quantity += item.quantity;
    }
    else{
        cart.items.push(item)
    }
    await cart.save();
    return res.send(cart);
}))

router.patch("/:productId", catchAsync(async(req,res)=>{
    const {productId} = req.params;
    const user = req.session.user_id;
    const {quantity} = req.body;
    let cart = {}
    if(user){
        cart = await Cart.findOne({user}).populate("items.product");
    }
    else{
        cart = await Cart.findById(req.session.cart_id).populate("items.product");
    }
    const itemIndex = cart.items.findIndex((item)=>item.product._id == productId)
    if(itemIndex !== -1){
        cart.items[itemIndex].quantity += quantity; // as quantity can be -1 or 1
        await cart.save()
    }
    res.send() // To send 200 status code
}))

router.delete("/:productId", catchAsync(async(req,res)=>{
    const {productId} = req.params;
    const user = req.session.user_id;
    let cart = {}
    if(user){
        cart = await Cart.findOne({user}).populate("items.product");
    }
    else{
        cart = await Cart.findById(req.session.cart_id).populate("items.product");
    }
    const itemIndex = cart.items.findIndex((item)=>item.product._id == productId)
    if(itemIndex !== -1){
        cart.items.splice(itemIndex,1)
        await cart.save();
    }
    res.send();
}) )

module.exports = router;