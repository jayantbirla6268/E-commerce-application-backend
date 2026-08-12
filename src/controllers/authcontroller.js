
const express=require("express");
const User=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
  const generateAccessToken = require("../utiils/generateAccessToken");
const generateRefreshToken = require("../utiils/generateRefreshToken");
const cookie=require("cookie")
const authMiddleware=require("../middlerware/authMiddleware");
const {sendEmail} = require("../utiils/emailServices");
const welcomeEmail = require("../templates/welcomeEmail");
const crypto = require("crypto");
const { trusted } = require("mongoose");

const signup=async(req,res)=>{
  try{
    const{firstname,lastname,emailid,password,role}=req.body;
    const hashedpassword=await bcrypt.hash(password,10)

    const user=new User({
        firstname,
        lastname,
        emailid,
        password:hashedpassword,
        role
    });
    await user.save();
    await sendEmail(
    user.emailid,
    "Welcome to Jayant Store 🎉",
   welcomeEmail(user.firstname),


`Welcome to Jayant Store.

Your account has been created successfully.

Thank you for joining us.

Regards,
Jayant Store`
);
    res.send("user register sucessfully")
  }catch(err){
    res.send(err.message)
  }
     
};


 const login = async (req, res) => {

    try {

        const { emailid, password } = req.body;

        const user = await User.findOne({ emailid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isvalidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isvalidPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is not valid"
            });
        }

        
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

// Save Refresh Token in DB
user.refreshToken = refreshToken;

await user.save();


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
         });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}; 

 
const profile=async(req,res)=>{
    try{
     const user=req.user
      res.status(200).json({
      success: true,
      user: user,
    })
    }catch(err){
     res.status(401).json({
    success: false,
    message:"user not found"
    
  });   
}

}
//logout

// const logout=async(req,res)=>{
//   try{
//     res.clearCookie("token"),
//     res.send("logout sucess fully");

//   }catch(err){
//     res.send(err.message)

    
//   }
// }

const logout = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {

            const decoded = jwt.verify(

                refreshToken,

                process.env.REFRESH_TOKEN_SECRET

            );

            const user = await User.findById(decoded.id);

            if (user) {

                user.refreshToken = "";

                await user.save();

            }

        }
        if (
    user.lockUntil &&
    user.lockUntil > Date.now()
) {
    return res.status(423).json({
        success: false,
        message: "Account is temporarily locked. Try again later."
    });
}

        res.clearCookie("accessToken");

        res.clearCookie("refreshToken");

        return res.status(200).json({

            success: true,

            message: "Logout Successful"

        });

    } catch (error) {

        res.clearCookie("accessToken");

        res.clearCookie("refreshToken");

        return res.status(200).json({

            success: true,

            message: "Logout Successful"

        });

    }

};

//generate refresh access token

// const refreshAccessToken = async (req, res) => {

//     try {

//         const refreshToken = req.cookies.refreshToken;

//         if (!refreshToken) {

//             return res.status(401).json({

//                 success: false,

//                 message: "Refresh Token Missing"

//             });

//         }

//         const decoded = jwt.verify(

//             refreshToken,

//             process.env.REFRESH_TOKEN_SECRET

//         );

//         const user = await User.findById(decoded.id);

//         if (!user) {

//             return res.status(404).json({

//                 success: false,

//                 message: "User Not Found"

//             });

//         }
// console.log("Cookie Token:", refreshToken);

// console.log("DB Token:", user.refreshToken);
//         if (user.refreshToken !== refreshToken) {

//             return res.status(401).json({

//                 success: false,

//                 message: "Invalid Refresh Token"

//             });

//         }

//         const accessToken = generateAccessToken(user._id);

//         res.cookie(

//             "Token",

//             accessToken,

//             {

//                 httpOnly: true,

//                 secure: trusted,

//                 sameSite: "lax",

//                 maxAge: 15 * 60 * 1000

//             }

//         );

//         res.status(200).json({

//             success: true,

//             message: "New Access Token Generated"

//         });

//     } catch (error) {

//         res.status(401).json({

//             success: false,

//             message: error.message

//         });

//     }

// };

//generate refresh token
const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh Token Missing"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        console.log("Cookie Token:", refreshToken);
        console.log("DB Token:", user.refreshToken);

        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid Refresh Token"
            });
        }

        const accessToken = generateAccessToken(user._id);

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "New Access Token Generated"
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};


//forgot password

const forgotPassword = async (req, res) => {

    try {

        const { emailid } = req.body;

        const user = await User.findOne({ emailid });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        // Generate random token
        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        // Save token in DB
        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        // Frontend URL
        const resetLink =
            `http://localhost:5173/reset-password/${resetToken}`;

        // Email HTML
        const html = `
            <h2>Password Reset</h2>

            <p>Hello ${user.firstname},</p>

            <p>Click the button below to reset your password.</p>

            <a href="${resetLink}"
               style="
                    background:#2563eb;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:5px;
               ">
               Reset Password
            </a>

            <p>This link expires in 15 minutes.</p>
        `;

        await sendEmail(

            user.emailid,

            "Reset Password",

            html

        );

        return res.status(200).json({

            success: true,

            message: "Password reset email sent."

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports={
    signup,
    login,
    profile,
    logout,
     refreshAccessToken,
     forgotPassword
}