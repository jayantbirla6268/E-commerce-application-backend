const express=require("express");

const couponRouter=express.Router();
const authmiddleware=require("../middlerware/authMiddleware");
const adminMiddleware=require("../middlerware/adminMiddleware");

const {addCoupon,getAllCoupons, deleteCoupon, applyCoupon}=require("../controllers/couponcontroller")

couponRouter.post("/addCoupon",authmiddleware,adminMiddleware,addCoupon);
couponRouter.get(
    "/getAllCoupons",
    authmiddleware,
    adminMiddleware,
    getAllCoupons
);

couponRouter.delete("/deleteCoupon/:id",authmiddleware,adminMiddleware,deleteCoupon);
couponRouter.post ("/applyCoupon",authmiddleware,applyCoupon);


module.exports=couponRouter;