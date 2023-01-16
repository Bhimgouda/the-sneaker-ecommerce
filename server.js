if(process.env.NODE_ENV !== "production") require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const {sessionConfig} = require("./config/sessionConfig")
const googelAuthRouter = require("./routes/googleAuth")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const {errorHandlingMiddleware} = require("./middleware")


// ---------------------------------- ESSENTIALS ----------------------------------//

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.MONGODB_URI;

// ---------------------------------- SESSION-CONFIG-------------------------------//

app.use(session(sessionConfig));

// --------------------------------- APP ROUTES ---------------------------------------- //

app.use("/api/auth/google/callback", googelAuthRouter)

app.use("/api", userRouter)

app.use("/api/products", productRouter)

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


