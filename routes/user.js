const express = require("express");
const Cart = require("../model/cart");
const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

// As soon as user comes to client (even after google auth redirect) the client makes call to check if user has unexpired cookies to log him in
router.get('/current-user', async(req,res)=>{
    if(req.session.user_id){
      const user = await User.findById(req.session.user_id).sort();
      user.orders.reverse()
      return res.send(user)
    }

    // Creating a localCart for the user
    else if(!req.session.cart_id){
      const {_id} = await Cart.create({
        items: [],
      })
      req.session.cart_id = _id;
    }

    return res.send()
}) 
  
router.get('/logout', catchAsync(async(req,res)=>{
    req.session.user_id = null;

    // creating localCart
    const {_id} = await Cart.create({
      items: [],
    })
    req.session.cart_id = _id;
    
    // This sends status code of 200
    return res.send() 
}))

module.exports = router;