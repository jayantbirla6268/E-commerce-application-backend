const express=require("express") 
const authMiddleware=require ("../middlerware/authMiddleware")
const orderRouter= express.Router();
const adminMiddleware=require("../middlerware/adminMiddleware")
const {createOrder,getMyOrders,getSingleOrder,updateOrderStatus,}= require ("../controllers/ordercontroller");


orderRouter.post("/createOrder",authMiddleware,createOrder);
orderRouter.get("/getMyOrders",authMiddleware,getMyOrders);
orderRouter.get("/getSingleOrder/:id",authMiddleware,getSingleOrder);
orderRouter.put("/updateOrderStatus/:id",authMiddleware,adminMiddleware,updateOrderStatus);

module.exports=orderRouter;