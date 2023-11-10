const nodemailer =require("nodemailer");
require('dotenv').config({path:`.env.${process.env.NODE_ENV}`})

const sendMail= async (message)=>{




  console.log(process.env.GMAIL)

    const transporter=nodemailer.createTransport({
        service:"gmail",
        port:587,
        secure: false,
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASS,
        }
    });



    const param = {
      from: "unshy.ebook@gmail.com",
      to: message.email,
      subject: message.subject,
      html: message.content,
    };



    await transporter.sendMail(param)
    .then((res)=>{
      return res;
    }).catch((erro)=>{
      throw erro;
    })

}

module.exports = {
  sendMail,
};