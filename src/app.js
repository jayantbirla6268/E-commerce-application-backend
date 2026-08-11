    const express =require("express");
    require("dotenv").config();
    const ConnectDB = require("./config/database");
    const User=  require("./model/user");
    const authRouter=require("./routes/authRoutes")
    const cookieParser=require("cookie-parser")
    const productRouter=require("./routes/productRoutes");
    const cartRouter = require("./routes/cartRoutes.");
    const orderRouter = require("./routes/orderRouter");
   
    const paymentRouter = require("./routes/paymentRoutes");
     const adminRouter = require("./routes/adminRouter");
     const wishlsitRouter=require("./routes/wishlistRouter")
     const reviewRouter =require("./routes/reviewRouter");


     // for live chat  soctet io
    //  const { Server } = require("socket.io");
    //  const http = require("http");
     
     
     const cors=require("cors");
const couponRouter = require("./routes/couponRouter");
 
    
   
     const app=express();
    
 

   
    
    app.use(cookieParser());// to read cookies//middlerware
    app.use(express.json());//middleware to parse json data
     
    
     app.use(
        
      cors({
        origin: [
            "http://localhost:5173",
            "https://e-commerce-application-frontend-jayantbirla6268s-projects.vercel.app"
        ],
        credentials: true
    })
);



    // routes
    app.use("/",authRouter)

    //add product

    app.use("/",productRouter)//app.use() connects a router to your Express application.
   
   //cart add,update,remove
   app.use("/",cartRouter);

   //oreder api
   app.use("/",orderRouter);

   //payment router
   app.use("/",paymentRouter);

   //admin router
   app.use("/",adminRouter);

   //wishlist router
   app.use("/",wishlsitRouter);

   //review Router

   app.use("/",reviewRouter);

   //coupon add
   app.use("/",couponRouter);


    ConnectDB();
   
//   io.on("connection", (socket) => {

//     console.log("User Connected:", socket.id);

// });
    app.listen(3000,()=>{
  
        console.log("server running on port 3000")
    })
