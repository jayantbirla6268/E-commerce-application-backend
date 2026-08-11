
// // const mongoose=require("mongoose");

// // const ConnectDB=async()=>{
// //     await mongoose.connect("mongodb+srv://jayantbirla858_db_user:jIGv25ZwK9GEeciF@cluster0.uwpcbzo.mongodb.net/")
// //     console.log("data base connected sucessfully");
// // }
// // module.exports=ConnectDB;

// const mongoose=require("mongoose");

// const ConnectDB=async()=>{
//     await mongoose.connect("mongodb+srv://jayantbirla858_db_user:jIGv25ZwK9GEeciF@cluster0.uwpcbzo.mongodb.net/")
//     console.log("data base connected sucessfully");
// }
// module.exports=ConnectDB;


const mongoose = require("mongoose");

const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
};

module.exports = ConnectDB;