
const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId, 
                ref:"Product",

            },
            quantity:Number,
            price:Number,
            
        },
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    shippingAddress: {
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
},
couponCode:{
  type:String,
  default:""
},
discount:{
  type:Number,
  default:0
},
    paymentStatus:{
        type:String,
        enum:["pending","Paid"],
        default:"pending",
    },
    orderStatus:{
        type:String,
        enum:["processing","shipped","delivered"],
        default:"processing"
    },
},
    {
        timestamps:true

    }
);

const Order=mongoose.model("Order",orderSchema);
module.exports=Order;