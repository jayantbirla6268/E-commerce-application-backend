const express=require("express")
const User=require("../model/user")
const Product =require("../model/product");
const {addToWishlist,getWishlist,removeWishlist} =require("../controllers/wishlistcontroller");
const wishlsitRouter=express("router");
const  authmiddleware=require("../middlerware/authMiddleware")
wishlsitRouter.post("/addToWishlist",authmiddleware,addToWishlist);
wishlsitRouter.get("/getWishlist",authmiddleware,getWishlist);
wishlsitRouter.delete("/removeWishlist/:id",authmiddleware,removeWishlist);


module.exports=wishlsitRouter;