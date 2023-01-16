const express = require("express");
const Product = require("../model/product");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router.get("/", catchAsync(async(req,res)=>{
    const products = await Product.find();
    return res.send(products)
}))

module.exports = router