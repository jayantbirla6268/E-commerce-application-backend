 //const jwt = require("jsonwebtoken");

//   const generateToken=(id)=>{
//     const token =jwt.sign({id},"jay@12345",{expiresIn:"7d"})
//      return token;
//   }
  

// module.exports = generateToken;


const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {

    return jwt.sign(

        {
            id: userId
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: "15m"
        }

    );

};

module.exports = generateAccessToken;