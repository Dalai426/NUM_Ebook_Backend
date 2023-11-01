const nodemailer =require("nodemailer");


const sendMail= async ()=>{

    const transporter=nodemailer.createTransport({
        service:"gmail",
        port:587,
        secure: false,
        auth: {
          user: "unshy.ebook@gmail.com",
          pass: process.env.NODE_MAILER_SECRET,
        },

    });
}