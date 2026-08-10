
const express=require ("express");
const {addToCart,getCart,updateCart,removeFromCart}=require("../controllers/cartcontroller");
const cartRouter=express.Router();
const  authMiddleware=require("../middlerware/authMiddleware")

 cartRouter.post("/addToCart",authMiddleware, addToCart);
 cartRouter.get("/getCart",authMiddleware,getCart);
 cartRouter.put("/updateCart/:id",authMiddleware,updateCart);
 cartRouter.delete("/removeFromCart/:id",authMiddleware,removeFromCart);


 module.exports=cartRouter;