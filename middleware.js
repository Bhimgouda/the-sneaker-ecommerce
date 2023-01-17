const CustomError = require("./utils/customError")

exports.errorHandlingMiddleware = (err,req,res,next)=>{
    console.log(err.stack)
    const {message='Something went Wrong', status=500} = err;
    res.status(status).send(message);
}

exports.isLoggedIn = (req,res,next)=>{
    if(!req.session.user_id)
        throw new CustomError("You are not authorized to do this", 401)
    return next()
}