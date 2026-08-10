
const User =require("../model/user");
const Product =require("../model/product");
const Order=require("../model/order");
const Cart= require("../model/cart");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

// const dashboard=async(req,res)=>{
//     try{
//        const totalUsers=await User.countDocuments();
//        const totalCarts=await Cart.countDocuments();
//        const totalOrders=await Order.countDocuments();
//        const totalProducts=await Product.countDocuments();
       
//     const recentOrders = await Order.find()
//     .populate("user", "firstname lastname")
//     .sort({ createdAt: -1 })
//     .limit(5);

//         res.status(200).json({
//             sucess:true,
//             dashboard:{
//                 totalUsers,
//                 totalProducts,
//                 totalOrders,
//                 totalRevenue,
//                 recentOrders
//             },
//         });

//     }catch(error){
//         res.status(500).json({
//             success:false,
//             message:error.message

//         })
//     }
// };

const dashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();
        const totalCarts = await Cart.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        const orders = await Order.find();

        let totalRevenue = 0;

        orders.forEach((order) => {

            if (order.paymentStatus === "paid") {

                totalRevenue += order.totalPrice;

            }

        });

        const recentOrders = await Order.find()
            .populate("user", "firstname lastname")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,
                totalProducts,
                totalOrders,
                totalCarts,
                totalRevenue,
                recentOrders

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


//get all user
const getAllUser=async(req,res)=>{
    try{
        const user=await User.find().select("-password");
        res.status(200).json({
            success:true,
            totalUsers:user.length,
            user,

        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

//get all orders

const getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find()
        .populate("user")
        .populate("items.product")
        
        res.status(200).json({
            success:true,
            totalOrders:orders.length,
            orders
        })
    }catch(error){
       res.status(500).json({
        success:false,
        message:error.message
       });
    };
};


//update order Status
  
// const updateOrderStatus=async(req,res)=>{
//     try{
//         const order=await Order.findById(req.params.id)
//         if(!order){
//             return res.status(404).json({
//                 success:false,
//                 message:"order not found"
//             });
//           order.orderStatus= req.body.orderStatus,
//           await order.save();

//         }
//     }catch(error){
//         res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
// };

// const updateOrderStatus = async (req, res) => {
//     try {
//         const order = await Order.findByIdAndUpdate(
//             req.params.id,
//             { orderStatus: req.body.orderStatus },
//             { new: true, runValidators: true } 
//         );
//         if (!order) return res.status(404).json({ success: false, message: "order not found" });

//         res.status(200).json({ success: true, order });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


const updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order status updated",

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

//delete User
 const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// admin controller 

const monthlySales = async (req, res) => {

    try {

        const sales = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "paid"
                }
            },

            {
                $group: {

                    _id: {
                        month: {
                            $month: "$createdAt"
                        }
                    },

                    revenue: {
                        $sum: "$totalPrice"
                    },

                    orders: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    "_id.month": 1
                }
            }

        ]);

        res.status(200).json({

            success: true,

            sales

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


//top selling product
const topSellingProducts = async (req, res) => {

    try {

        const products = await Order.aggregate([
 
          
            {
                $match: {
                    paymentStatus: ""
                }
            },
            {
                $unwind: "$items"
            },

            {
                $group: {

                    _id: "$items.product",

                    totalSold: {
                        $sum: "$items.quantity"
                    }

                }

            },

            {
                $sort: {
                    totalSold: -1
                }

            },

            {
                $limit: 5
            },

            {
                $lookup: {

                    from: "products",

                    localField: "_id",

                    foreignField: "_id",

                    as: "product"

                }

            },

            {
                $unwind: "$product"
            }

        ]);

        res.status(200).json({

            success: true,

            products

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


///top coustomer buiying product

const topCustomers = async (req, res) => {

    try {

        const customers = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "paid"
                }
            },

            {
                $group: {

                    _id: "$user",

                    totalSpent: {
                        $sum: "$totalPrice"
                    },

                    totalOrders: {
                        $sum: 1
                    }

                }

            },

            {
                $sort: {
                    totalSpent: -1
                }
            },

            {
                $limit: 5
            },

            {
                $lookup: {

                    from: "users",

                    localField: "_id",

                    foreignField: "_id",

                    as: "user"

                }

            },

            {
                $unwind: "$user"
            }

        ]);

        res.status(200).json({

            success: true,

            customers

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


//excel report

const exportSalesExcel = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user");

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet("Sales Report");

        worksheet.columns = [

            {
                header: "Customer",
                key: "customer",
                width: 25
            },

            {
                header: "Amount",
                key: "amount",
                width: 15
            },

            {
                header: "Payment",
                key: "payment",
                width: 20
            },

            {
                header: "Status",
                key: "status",
                width: 20
            },

            {
                header: "Date",
                key: "date",
                width: 20
            }

        ];

        orders.forEach((order) => {

            worksheet.addRow({

                customer:
                    order.user.firstname +
                    " " +
                    order.user.lastname,

                amount: order.totalPrice,

                payment: order.paymentStatus,

                status: order.orderStatus,

                date: order.createdAt.toLocaleDateString()

            });

        });

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            "attachment; filename=SalesReport.xlsx"

        );

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
//exportsakles pdf
const exportSalesPDF = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user");

        const doc = new PDFDocument({
            margin: 40
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=SalesReport.pdf"
        );

        doc.pipe(res);

        doc
            .fontSize(22)
            .text("Sales Report", {
                align: "center"
            });

        doc.moveDown();

        orders.forEach((order) => {

            doc
                .fontSize(12)
                .text(
                    `Customer : ${order.user.firstname} ${order.user.lastname}`
                );

            doc.text(
                `Amount : ₹${order.totalPrice}`
            );

            doc.text(
                `Payment : ${order.paymentStatus}`
            );

            doc.text(
                `Status : ${order.orderStatus}`
            );

            doc.text(
                `Date : ${order.createdAt.toLocaleDateString()}`
            );

            doc.moveDown();

        });

        doc.end();

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports={getAllUser,dashboard,updateOrderStatus,deleteUser,getAllOrders,monthlySales,topSellingProducts,topCustomers,exportSalesExcel,exportSalesPDF}