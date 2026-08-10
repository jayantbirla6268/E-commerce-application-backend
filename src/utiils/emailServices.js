const nodemailer = require("nodemailer");
const welcomeEmail=require("../templates/welcomeEmail")


const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


const sendEmail = async (to, subject, html) => {

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to,

            subject,

            html

        });

        console.log("Email sent successfully");

    } catch(error) {

        console.log(error);

    }

};


module.exports ={ sendEmail,transporter}