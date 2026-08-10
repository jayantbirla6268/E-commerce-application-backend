const express = require("express");

const reviewRouter = express.Router();

const {
    addReview,
    getProductReviews,
    deleteReview
} = require("../controllers/reviewcontroller");

const authmiddleware=require("../middlerware/authMiddleware");


// Add Review
reviewRouter.post("/addReview", authmiddleware, addReview);

// Get Reviews of One Product
reviewRouter.get("/getProductReviews/:id", getProductReviews);

// Delete Review
reviewRouter.delete("/deleteReview/:id", authmiddleware, deleteReview);

module.exports = reviewRouter;