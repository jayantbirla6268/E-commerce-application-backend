
const express = require('express')
 
const productRouter=express.Router();

const {addProduct,getAllProduct, getSingleProduct,updateProduct,deleteProduct}=require("../controllers/productcontroller");

productRouter.post("/addProduct",addProduct);
productRouter.get("/getAllProduct",getAllProduct);
productRouter.get("/getSingleProduct/:id",getSingleProduct);
productRouter.put("/updateProduct/:id",updateProduct)
productRouter.delete("/deleteProduct/:id",deleteProduct)
 
module.exports=productRouter;

