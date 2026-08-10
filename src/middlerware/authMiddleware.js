 const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authmiddleware = async (req, res, next) => {
    try {
  
        const token=req.cookies.token;
         
    
       
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found",
            });
        }

        const decoded = jwt.verify(token, "jay@12345");
           const{_id}=decoded;//extracting id from decode message
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};

module.exports = authmiddleware;