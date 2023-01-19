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
    const cart = await Cart.findOne({user})
    res.send(cart)
}))

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


