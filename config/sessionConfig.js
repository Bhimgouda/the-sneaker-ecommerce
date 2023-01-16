const MongoStore = require("connect-mongo");

// Initializing mongo store to save session data
const store = new MongoStore({
    mongoUrl: process.env.MONGODB_URI,
    secret: process.env.SESSION_SECRET,
    touchAfter: 24*60*60,
})

store.on('error', (e)=>{
  console.log("Session store error", e)
})

exports.sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000*60*60*24*7,
      maxAge: 1000*60*60*24*7,
    },
}