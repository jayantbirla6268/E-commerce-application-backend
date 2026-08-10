
const Order=require("../model/order");
const Cart=require("../model/cart");
const sendEmail = require("../utiils/emailServices");

const createOrder=async(req,res)=>{
    try{

        const {shippingAddress,couponCode,discount}=req.body;
        //console.log(shippingAddress)
        const  cartItems=await Cart.find({
            user:req.user._id,
         }).populate("product");
       
         if(cartItems.length===0){
            return res.status(400).json({
                sucess:false,
                message:"cart is empty",

            });
         }
         let totalPrice=0;
         const items=cartItems.map((item)=>{
            totalPrice=totalPrice+item.product.price*item.quantity;

            return{
                product:item.product._id,
                quantity:item.quantity,
                price:item.product.price,
            };
         });

         let finalPrice = totalPrice;

      if(discount){

    finalPrice = totalPrice - discount;
}
         const order=await Order.create({
            user:req.user._id,
            items,
            totalPrice:finalPrice,
            
            shippingAddress,
            paymentStatus: "pending",
            orderStatus: "processing",
            couponCode,
            discount
         });

         //clear cart after order

         await Cart.deleteMany({
            user:req.user._id,
         });
const createOrder=async(req,res)=>{
    try{

        const {shippingAddress}=req.body;
        //console.log(shippingAddress)
        const  cartItems=await Cart.find({
            user:req.user._id,
         }).populate("product");
       
         if(cartItems.length===0){
            return res.status(400).json({
                sucess:false,
                message:"cart is empty",

            });
         }
         let totalPrice=0;
         const items=cartItems.map((item)=>{
            totalPrice=totalPrice+item.product.price*item.quantity;

            return{
                product:item.product._id,
                quantity:item.quantity,
                price:item.product.price,
            };
         });
         const order=await Order.create({
            user:req.user._id,
            items,
            totalPrice,
            shippingAddress,
            shippingAddress,
            paymentStatus: "pending",
            orderStatus: "processing"
         });

         //clear cart after order

         await Cart.deleteMany({
            user:req.user._id,
         });

         res.status(201).json({
            sucess:true,
            message:"oreder Placed sucessfully",
            order,
         });
await sendEmail(

    req.user.emailid,

    "Order Placed Successfully 🎉",

    `Hello ${req.user.firstname},

Thank you for shopping with Jayant Store.

Your order has been placed successfully.

Order ID:
${order._id}

Total Amount:
₹${order.totalPrice}

Order Status:
${order.orderStatus}

Payment Status:
${order.paymentStatus}


Thank you,
Jayant Store`

);

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message,
        });
    }
};


         res.status(201).json({
            sucess:true,
            message:"oreder Placed sucessfully",
            order,
         });
 

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message,
        });
    }
};


//get my order api

const getMyOrders=async(req,res)=>{
    try{
        const orders=await Order.find({
            user:req.user._id,
         }).populate("items.product");

         res.status(200).json({
            sucess:true,
            totalOrders:orders.length,
            orders,

         });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


//get single order

const getSingleOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        .populate("items.product");
     if(!order){
        return res.status(404).json({
            success:false,
            message:"order not found",

        });

     }
     res.status(200).json({
        sucess:true,
        order,
     });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};

//updateOrderStatus

const updateOrderStatus=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({
                sucess:false,
                message:"order not found",
            });
        }
        order.orderStatus=req.body.updateOrderStatus;
        await order.save();

        res.status(200).json({
            success:true,
            message:"order Status updated",
            order,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }

};




module.exports={createOrder,getMyOrders ,getSingleOrder,updateOrderStatus};