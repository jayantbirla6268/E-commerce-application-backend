const express=require("express") 
const authmiddleware=require ("../middlerware/authMiddleware")
const orderRouter= express.Router();
const adminMiddleware=require("../middlerware/adminMiddleware")
const {createOrder,getMyOrders,getSingleOrder,updateOrderStatus,}= require ("../controllers/ordercontroller");


orderRouter.post("/createOrder",authmiddleware,createOrder);
orderRouter.get("/getMyOrders",authmiddleware,getMyOrders);
orderRouter.get("/getSingleOrder/:id",authmiddleware,getSingleOrder);
orderRouter.put("/updateOrderStatus/:id",authmiddleware,adminMiddleware,updateOrderStatus);

module.exports=orderRouter;