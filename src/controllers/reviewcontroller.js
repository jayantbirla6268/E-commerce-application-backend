const Review=require("../model/review");
const Product =require("../model/product");

 const addReview = async (req, res) => {

    try {

        const { productId, rating, comment } = req.body;

        // Check Product Exists

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }

        // Check if user already reviewed

        const alreadyReviewed = await Review.findOne({

            user: req.user._id,

            product: productId

        });

        if (alreadyReviewed) {

            return res.status(400).json({

                success: false,

                message: "You already reviewed this product"

            });

        }
               

        // Create Review

        const review = await Review.create({

            user: req.user._id,

            product: productId,

            rating,

            comment

        });
        

        res.status(201).json({

            success: true,

            message: "Review added successfully",

            review,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

//

const getProductReviews = async (req, res) => {

    try {

        const review = await Review.find({

            product: req.params.id
            

        })
        
        .populate("user", "firstname lastname emailid ")
       
        .sort({ createdAt: -1 });
          
        res.status(200).json({

            success: true,

            totalReviews: review.length,

            review

        });
          

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const deleteReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found"

            });

        }

        // Check review owner

        if (review.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({

                success: false,

                message: "You are not allowed to delete this review"

            });

        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Review deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
module.exports = {

    addReview,

    getProductReviews,
    
    deleteReview

};