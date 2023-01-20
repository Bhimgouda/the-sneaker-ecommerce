if(process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const {sessionConfig} = require("./config/sessionConfig")
const googelAuthRouter = require("./routes/googleAuth")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const paymentRouter = require("./routes/paymentRoute")
const webhookRouter = require("./routes/webhook")
const {errorHandlingMiddleware, isLoggedIn} = require("./middleware");
const Cart = require("./model/cart");
const catchAsync = require("./utils/catchAsync");

// ---------------------------------- ESSENTIALS ----------------------------------//

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.MONGODB_URI;

// ----------------------------------- STRIPE WEBHOOK ROUTE ------------------------//

// This route needs to be above express body parser

app.use("/api/webhook", webhookRouter)

// ---------------------------------- SESSION-CONFIG-------------------------------//

app.use(session(sessionConfig));
app.use(express.json())

// --------------------------------- APP ROUTES ---------------------------------------- //

app.use("/api/auth/google/callback", googelAuthRouter)

app.use("/api", userRouter)

app.use("/api/products", productRouter)

app.use("/api", paymentRouter)

app.get('/api/cart', isLoggedIn, catchAsync(async(req,res)=>{
    const user = req.session.user_id
    const cart = await Cart.findOne({user}).populate("items.product");
    res.send(cart)
}))

app.put('/api/cart', isLoggedIn, catchAsync(async(req,res)=>{
    const user = req.session.user_id;
    const item = req.body;
    const cart = await Cart.findOne({user})
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

app.patch("/api/cart/:productId", isLoggedIn, catchAsync(async(req,res)=>{
    const {productId} = req.params;
    const user = req.session.user_id;
    const {quantity} = req.body;
    const cart = await Cart.findOne({user}).populate("items.product")
    const itemIndex = cart.items.findIndex((item)=>item.product._id == productId)
    if(itemIndex !== -1){
        cart.items[itemIndex].quantity += quantity; // as quantity can be -1 or 1
        await cart.save()
    }
    res.send() // To send 200 status code
}))

app.delete("/api/cart/:productId",isLoggedIn, catchAsync(async(req,res)=>{
    const {productId} = req.params;
    const user = req.session.user_id;
    const cart = await Cart.findOne({user});
    const itemIndex = cart.items.findIndex((item)=>item.product._id == productId)
    if(itemIndex !== -1){
        cart.items.splice(itemIndex,1)
        await cart.save();
    }
    res.send();
}) )

// -------------------------------- Error Handling middleware --------------------------//

app.use(errorHandlingMiddleware)

// ------------------------------- Starting the server ---------------------------------//
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

// ------------------------------- Connecting to MONGODB --------------------------------//
mongoose.set("strictQuery", false)
mongoose.connect(dbUrl)
.then(()=>console.log("Successfully connected to the DB"))
.catch((e)=>console.log(e))


