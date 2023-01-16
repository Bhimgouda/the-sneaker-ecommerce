exports.errorHandlingMiddleware = (err,req,res,next)=>{
    console.log(err.stack)
    const {message='Something went Wrong', status=500} = err;
    res.status(status).send(message);
}