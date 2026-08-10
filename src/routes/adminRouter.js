const express=require("express");
const {getAllUser,dashboard,updateOrderStatus,deleteUser,getAllOrders, monthlySales,topSellingProducts,topCustomers,exportSalesExcel, exportSalesPDF}=require("../controllers/admincontroller");
const authmiddleware=require("../middlerware/authMiddleware");
const adminMiddleware=require("../middlerware/adminMiddleware")

const adminRouter=express("router");

adminRouter.get("/dashboard",authmiddleware,adminMiddleware,dashboard);
adminRouter.get("/getAllUser",authmiddleware,adminMiddleware,getAllUser);
adminRouter.get("/getAllOrders",authmiddleware,adminMiddleware,getAllOrders);
adminRouter.put("/updateOrderStatus/id",authmiddleware,adminMiddleware,updateOrderStatus);
adminRouter.delete("/deleteUser/:id",authmiddleware,adminMiddleware,deleteUser);
adminRouter.get("/monthlySales",authmiddleware,adminMiddleware,monthlySales)
adminRouter.get("/topSellingProducts",authmiddleware,adminMiddleware,topSellingProducts);
adminRouter.get("/topCustomers",authmiddleware,adminMiddleware,topCustomers);
adminRouter.get("/exportSalesExcel",authmiddleware,adminMiddleware,exportSalesExcel);
adminRouter.get("/exportSalesPDF",authmiddleware,adminMiddleware,exportSalesPDF);

module.exports =adminRouter;

