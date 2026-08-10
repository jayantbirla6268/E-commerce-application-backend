
const Product = require("../model/product");
const Wishlist= require ("../model/wishlist");


const addToWishlist=async(req,res)=>{
    try{
        const {productId}=req.body;
        
        const product =await Product.findById(productId);
        if(!product ){
            return res.status(404).json({
                sucess:false,
                message:"product not found"
            });
        }
     
        const alreadyExists=await Wishlist.findOne({
            user:req.user._id,
            product:productId
        });
        if(alreadyExists){
            return res.status(400).json({
                sucess:false,
                message:"product already in wishlist"
            });
        };
        
 const wishlist = await Wishlist.create({
            user:req.user._id,
            product:productId
        });

        res.status(201).json({
            sucess:true,
            message:'product added to wishlist',
            wishlist
        });



    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message
        });
    }
};


 const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find({

            user: req.user._id

        }).populate("product");

        res.status(200).json({

            success: true,

            totalItems: wishlist.length,

            wishlist

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const removeWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.findById(req.params.id);

        if (!wishlist) {

            return res.status(404).json({

                success: false,

                message: "Wishlist item not found"

            });

        }

        await Wishlist.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Product removed from wishlist"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports={addToWishlist,getWishlist,removeWishlist}