const express=require("express")

const adminMiddleware=(req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(403).json({
                sucess:false,
                message:"access denied.Admin only",
            })
        }
        next()

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

module.exports=adminMiddleware;