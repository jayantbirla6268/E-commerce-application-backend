const express = require('express');
 const Product=require("../model/product")
//redis memory
const redisClient = require("../config/redis");

 //add product

 const addProduct=async(req,res)=>{
    try{
        const {title,price,description,category,image,stock}=req.body;

        const product= await new Product({
            title,price,description,category,image,stock
        });

        await product.save();
        res.status(201).json({
            sucess:true,
            message:"product add sucessfully",
            product,
        });


    }catch(err){
        res.status(500).json({
            sucess:false,
            message:err.message,
        });
    }

    
}
   //get All ptroduct
    const getAllProduct=async(req,res)=>{
        try{
            const page=Number(req.query.page) //||1;
            const limit=Number(req.query.limit)//||5;
            const skip=(page-1)*limit;

            const keyword=req.query.search
            ?{
                title:{
                    $regex:req.query.search,
                    $options:"i"
                }
            }
             :{};

             const category=req.query.category
             ?{
                category:req.query.category,
             }
             :{};

        //       // 1. Check Redis
        // const cachedProducts = await redisClient.get(cacheKey);

        // if (cachedProducts) {

        //     console.log("Products from Redis");

        //     return res.status(200).json(JSON.parse(cachedProducts));

        // }

        const products= await Product.find({
            ...keyword,
            ...category,
        }) //to find all the product
              .skip(skip)
              .limit(limit);
         const totalProducts=await Product.countDocuments({
            ...keyword,
            ...category,
         });

          res.status(200).json({
            sucess:true,
            totalProducts,
            currentPage:page,
            totalPages:Math.ceil(totalProducts/limit),
            message:"product fetch",
            products,
        
        })
       
        
        }catch(err){

            res.status(500).json({
                sucess:false,
                message:err.message,
            })
         } 

    };

    //get single prodict

     const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//UPDATE PRODUCT


const updateProduct=async(req,res)=>{
    try{
    const product=await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
         {
        new: true,
        runValidators: true,
    }
    );
    if(!product){
        throw new Error("product not found")
    }
    res.status(200).json({
        sucess:true,
        message:"product update sucessfully",
        product,
    })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,

            
     });

    }
};
 

//delete api

const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(
            req.params.id,
         )
         if(!product){
            throw new Error("product not found");
         }
         res.status(200).json({
            sucess:true,
            message:"product deleted sucessfully"
         });

    }catch(err){
        res.status(500).json({
        sucess:false,
        message:"err.message"
        })
    }
}

 
 module.exports={addProduct,getAllProduct,getSingleProduct,updateProduct,deleteProduct};