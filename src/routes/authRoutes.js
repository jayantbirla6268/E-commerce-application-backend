

const express=require("express");
const {signup,login,profile,logout, refreshAccessToken,forgotPassword}=require("../controllers/authcontroller")
const authMiddleware=require("../middlerware/authMiddleware");
const addProduct  =require("../controllers/productcontroller")
const loginLimiter=require("../middlerware/rateLimiter")
//const forgotPassword=require("../controllers/authcontroller");

const authRouter= express.Router();
 


authRouter.post("/signup",signup);

authRouter.post("/login",loginLimiter, login);

authRouter.get("/profile",authMiddleware,profile);

authRouter.post("/logout",logout);

authRouter.post("/refreshAccessToken", refreshAccessToken);

authRouter.post("/frogotPassword",forgotPassword)

// productcontroller

 

module.exports=authRouter;
