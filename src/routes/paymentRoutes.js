const express = require("express");

const paymentRouter = express.Router();
const authmiddleware=require("../middlerware/authMiddleware")


const {
    createPayment,
    verifyPayment
} = require("../controllers/paymentController");


paymentRouter.post("/createPayment/:id",authmiddleware,createPayment);
paymentRouter.post("/verifyPayment",authmiddleware,verifyPayment);


module.exports=paymentRouter;