const mongoose=require("mongoose");

const couponSchema=mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    
    expiryDate:{
        type:Date,
        required:true,

    },
    active:{
        type:Boolean,
        default:true,

    },
     

},
{timestamps:true,

}
);

const Coupon=mongoose.model("Coupon",couponSchema);
module.exports=Coupon;