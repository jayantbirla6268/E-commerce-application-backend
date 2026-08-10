const Coupon=require("../model/coupon");
const addCoupon=async(req,res)=>{
    try{
        const {code,discount,expiryDate}=req.body;
        
        const existingCoupon=await Coupon.findOne({
            code:code.toUpperCase(),

        });
        if(existingCoupon){
            return res.status(400).json({
                sucess:false,
                message:"Coupon already exists",
            });
        }
         const coupon=await Coupon.create({
            code:code.toUpperCase(),
            discount,
            expiryDate,
         });
         res.status(201).json({
            sucess:true,
            message:"coupon created sucessfully",
            coupon,
         });


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,

        });

    }
};


//get all coupon

const getAllCoupons=async(req,res)=>{
    try{
        const coupons=await Coupon.find().sort({
            createdAt:-1
        });
         res.status(200).json({
            sucess:true,
            totalCoupans:coupons.length,
            coupons
         });

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message
        });
    }
};

//delete coupon


const deleteCoupon=async(req,res)=>{
    try{
        
        const coupon=await Coupon.findById(req.params.id);
        if(!coupon){
            return res.status(404).json({
                sucsess:false,
                message:"coupon not found"
            });
        }
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(200).json({
            sucess:true,
            message:"coupon deleted sucessfully"
        });
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message
        });
    }
};

//applyCoupon
const applyCoupon = async (req, res) => {

    try {

        const { code, totalPrice } = req.body;

        const coupon = await Coupon.findOne({
            code: code.toUpperCase()
        });

        if (!coupon) {

            return res.status(404).json({
                success: false,
                message: "Invalid Coupon"
            });

        }

        if (!coupon.active) {

            return res.status(400).json({
                success: false,
                message: "Coupon is inactive"
            });

        }

        if (coupon.expiryDate < new Date()) {

            return res.status(400).json({
                success: false,
                message: "Coupon has expired"
            });

        }

        const discountAmount =
            (totalPrice * coupon.discount) / 100;

        const finalPrice =
            totalPrice - discountAmount;

        res.status(200).json({

            success: true,

            coupon,

            discountAmount,

            finalPrice

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
 
module.exports={addCoupon,getAllCoupons,deleteCoupon,applyCoupon};

