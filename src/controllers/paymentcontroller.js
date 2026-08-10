
const Order = require("../model/order");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const authmiddleware=require("../middlerware/authMiddleware");
const {sendEmail} = require("../utiils/emailServices");
 
 
const createPayment = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        const options = {
            amount: order.totalPrice * 100,
            currency: "INR",
            receipt: order._id.toString()
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            razorpayOrder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const verifyPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed"
            });

        };

         console.log("Create Payment API Called");
        


        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        order.paymentStatus = "Paid";

        await order.save();
        await sendEmail(

    order.user.emailid,

    "Payment Successful ✅",

    `Hello ${order.user.firstname},

Your payment has been received successfully.

Order ID:
${order._id}

Amount Paid:
₹${order.totalPrice}

Payment ID:
${razorpay_payment_id}


Your order is being processed.

Thank you for shopping with Jayant Store.`

);

        res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createPayment,
    verifyPayment
};