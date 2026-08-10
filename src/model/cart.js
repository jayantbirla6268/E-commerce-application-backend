

const mongoose=require("mongoose");
const Product = require("./product");
const { Timestamp } = require("mongodb");
const cartSchema=mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId, //waht type of data will store like  user=id;
        ref:"user",
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
        min:1,
    },

},{Timestamp:true,}
);

const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;