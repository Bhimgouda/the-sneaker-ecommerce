const catchAsync = (fn)=>{
    return (req,res,next)=>{
        fn(req,res).catch(e=>next(e))
    }
}

module.exports = catchAsync