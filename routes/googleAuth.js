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


  const user = await User.findOne({email: userData.email});
  if(user)  req.session.user_id = user._id;
  else {
    const {_id} = await User.create({
      name: userData.name,
      email: userData.email,
      profilePic: userData.picture,
    })

    // Creating a cart for the newly registered user
    await Cart.create({
      user: _id,
      items: [],
    })

    req.session.user_id = _id;

  }


  if(process.NODE_ENV !== "production"){
    return res.redirect("http://localhost:3000")
  }
  return res.redirect("/");
}))

module.exports = router;