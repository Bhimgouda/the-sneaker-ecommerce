const express = require("express");
const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

// As soon as user comes to client (even after google auth redirect) the client makes call to check if user has unexpired cookies to log him in
router.get('/current-user', async(req,res)=>{
    if(req.session.user_id){
      const user = await User.findById(req.session.user_id);
      return res.send(user)
    }
    return res.end()
}) 
  
router.get('/logout', catchAsync(async(req,res)=>{
    req.session.user_id = null;
    return res.send({message:"You are successfully Logged Out"})
}))

module.exports = router;