

const express=require("express");
const {signup,login,profile,logout, refreshAccessToken,forgotPassword}=require("../controllers/authcontroller")
const authmiddleware=require("../middlerware/authMiddleware");
const addProduct  =require("../controllers/productcontroller")
const loginLimiter=require("../middlerware/rateLimiter")
//const forgotPassword=require("../controllers/authcontroller");

const authRouter= express.Router();
 


authRouter.post("/signup",signup);

authRouter.post("/login", login);//loginlimiter

authRouter.get("/profile",authmiddleware,profile);

authRouter.post("/logout",logout);

authRouter.post("/refreshAccessToken", refreshAccessToken);

authRouter.post("/frogotPassword",forgotPassword)

// productcontroller

 

module.exports=authRouter;
