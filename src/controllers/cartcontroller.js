
const express= require("express")
const Cart=require("../model/cart");
const Product=require("../model/product");

    const addToCart=async(req,res)=>{
    try{
        const {productId,quantity}=req.body;

        //check if product exists 
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found",
                product,
            });
        }

        //check if product laready exists in card

        let cart=await Cart.findOne({
            user:req.user._id,
            product:productId
        });

        if (cart){
            cart.quantity =cart.quantity+quantity;
            await cart.save();
            return res.status(200).json({
                success:true,
                message:"qunatity updated",
                cart,
            });

        }

            cart = await Cart.create({
            user:req.user._id,
            product:productId,
            quantity,
        });
            res.status(201).json({
            success:true,
            message:"added to cart",
            cart,
        });

        }catch(error){
            res.status(500).json({
            success:false,
            message:error.message,
        });
        }
    };

//get Cart Api

 const getCart=async(req,res)=>{
    try{
        const cart=await Cart.find({
            user:req.user._id,
        }).populate("product");

        let totalPrice=0;
        cart.forEach((item)=>{
            totalPrice=totalPrice+item.product.price*item.quantity;
        });

        res.status(200).json({
            sucess:true,
            totalPrice:cart.length,
            totalPrice,
            cart,
        });
    
    }   catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message,
        });

    };
 };
//update Qunatity
    const updateCart=async(req,res)=>{
    try{
        const cart=await Cart.findById(req.params.id);

        if(!cart){
            return res.status(404).json({
                sucess:false,
                message:"cart item Not found"
            });
        }
     cart.quantity=req.body.quantity;
     await cart.save();
     res.status(200).json({
        sucess:true,
        message:"quantity update",
        cart,
     });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

//RemoveItem

const removeFromCart = async (req, res) => {

  try {

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    await cart.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item Removed Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




module.exports={addToCart,getCart,updateCart,removeFromCart};
 