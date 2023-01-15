if(process.env.NODE_ENV !== "production") require("dotenv").config()
const { default: axios } = require("axios");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const catchAsync = require("./utils/catchAsync");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./model/user");


// ---------------------------------- ESSENTIALS ----------------------------------//

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.MONGODB_URI;

// ---------------------------------- SESSION-CONFIG-------------------------------//

const secret = process.env.SESSION_SECRET;

// Initializing mongo store to save session data
const store = new MongoStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24*60*60
})

store.on('error', (e)=>{
  console.log("Session store error", e)
})

// Session config
const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000*60*60*24*7,
    maxAge: 1000*60*60*24*7,
  },
}

app.use(session(sessionConfig));



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
      });; 
    return data;
}


// Google redirect Url to where the code is sent from which we get access_token and from that access_token we can get user data from google
app.get("/api/auth/google/callback", catchAsync(async(req,res)=>{
  const {code} = req.query
  const accessToken = await getAccessTokenFromGoogle(code)
  const userData = await getUserDataFromAccessToken(accessToken)

  const user = await User.findOne({email: userData.email});
  if(user) {
    req.session.user_id = user._id;
  }
  else{
    const {_id} = await User.create({
      name: userData.name,
      email: userData.email,
    })
    req.session.user_id = _id;
  }

  if(process.NODE_ENV !== "production"){
    return res.redirect("http://localhost:3000")
  }
  return res.redirect("/");
}))

// As soon as it redirects to client ... the react app re-renders and the client logged-in function makes the call with user id in req.session and we respond with the user from DB
app.get('/api/current-user', async(req,res)=>{
  if(req.session.user_id){
    const user = await User.findById(req.session.user_id);
    return res.send(user)
  }
  return res.end()
}) 

app.get('/api/logout', catchAsync(async(req,res)=>{
  req.session.user_id = null;
  return res.send({message:"You are successfully Logged Out"})
}))


// Error Handling middleware

app.use((err,req,res,next)=>{
    console.log(err.stack)
    const {message='Something went Wrong', status=500} = err;
    res.status(status).send(message);
})

// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

// Connecting to MONGODB
mongoose.set("strictQuery", false)
mongoose.connect(dbUrl)
.then(()=>console.log("Successfully connected to the DB"))
.catch((e)=>console.log(e))


