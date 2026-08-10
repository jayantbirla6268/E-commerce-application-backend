
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["user","admin"],
         default:"user"
    },
    refreshToken: {
    type: String,
    default: ""
},
loginAttempts: {
    type: Number,
    default: 0
},

lockUntil: {
    type: Date,
    default: null
},
resetPasswordToken: {
    type: String,
    default: ""
},

resetPasswordExpires: {
    type: Date,
    default: null
}

});

const User=mongoose.model("User",userSchema);
module.exports=User;