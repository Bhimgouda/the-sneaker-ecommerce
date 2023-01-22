const { default: axios } = require("axios");
const express = require("express");
const Cart = require("../model/cart");
const router = express.Router()
const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");


const getAccessTokenFromGoogle = async(codeFromGoogle)=>{
    const {data} = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_SECRET_API_KEY,
          redirect_uri: 'http://localhost:5000/api/auth/google/callback',
          grant_type: 'authorization_code',
          code: codeFromGoogle,
        },
      });

      return (data.access_token)
}

const getUserDataFromAccessToken = async(accessToken)=>{
    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    return data;
}


// Google redirect Url to where the code is sent from which we get access_token and from that access_token we can get user data from google
router.get("/", catchAsync(async(req,res)=>{
  const {code} = req.query
  const accessToken = await getAccessTokenFromGoogle(code)
  const userData = await getUserDataFromAccessToken(accessToken)
  
  let user = await User.findOne({email: userData.email});
  
  if(user) { // For registered Users
    req.session.user_id = user._id;
    // Transfering cart items from localCart to userCart
    const localCart = await Cart.findById(req.session.cart_id).populate("items.product")
    const userCart = await Cart.findOne({user:user._id}).populate("items.product")

    // Check by creating lookup object
    const lookupObj = {};

    userCart.items.forEach((item,index)=>{
      if(item.product){
      lookupObj[item.product._id] = {quantity: item.quantity, itemIndex:index}
      lookupObj[item.product.id]
      }
    })

    localCart.items.forEach(item=>{
      if(item.product){
        const productId = item.product._id
        lookupItem= lookupObj[productId]
        if(lookupItem){
         return userCart.items[lookupItem.itemIndex].quantity += item.quantity;
        }
        userCart.items.push({product: item.product, quantity: item.quantity})
      }
    })

    await userCart.save()
    await Cart.findByIdAndDelete(localCart._id);
    req.session.cart_id = null;
  }
  
  else { // For new users
    user = await User.create({
      name: userData.name,
      email: userData.email,
      profilePic: userData.picture,
    })
    req.session.user_id = user._id;

    // Getting the localCart and transforming it to userCart
    const cartId = req.session.cart_id
    await Cart.findByIdAndUpdate(cartId, {user:user._id});
    req.session.cart_id = null;
  }


  if(process.NODE_ENV !== "production"){
    return res.redirect("http://localhost:3000")
  }
  return res.redirect("/");
}))

module.exports = router;