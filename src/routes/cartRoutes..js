
const express=require ("express");
const {addToCart,getCart,updateCart,removeFromCart}=require("../controllers/cartcontroller");
const cartRouter=express.Router();
const  authmiddleware=require("../middlerware/authMiddleware")

 cartRouter.post("/addToCart",authmiddleware, addToCart);
 cartRouter.get("/getCart",authmiddleware,getCart);
 cartRouter.put("/updateCart/:id",authmiddleware,updateCart);
 cartRouter.delete("/removeFromCart/:id",authmiddleware,removeFromCart);


 module.exports=cartRouter;