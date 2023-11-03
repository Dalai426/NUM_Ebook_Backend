const express = require("express");
const router = express.Router();

const { validateNumEmail } = require("../utils/EmailValidation");
const { sendMail } = require("../utils/Mail");

const ApiError = require("../error/apiError");
const errorM = require("../error/ErrorM");



router.post("/login/:email", async (req, res, next) => {

    const email = req.params.email;

    if (!await validateNumEmail({ email: email })) {
        return next(ApiError.badRequest(errorM.WRONG_EMAIL));
    }

    try {

        const link="https://www.npmjs.com/package/nodemailer-express-handlebars";
        const content=`<html lang="en">
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    margin: 2rem auto;
                }
        
                .container {
                    max-width: 30rem;
                    margin: 2rem auto;
                    padding: 4rem;
                    background-color: #fff;
                    border-radius: 1rem;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
        
                .header {
                    text-align: center;
                    margin-bottom: 1rem;
                }
        
                .header h1 {
                    color:#007bff;
                    font-size: 1.5rem;
                    margin: 0;
                }
        
                .content {
                    text-align: center;
                }
        
                .content p {
                    line-height: 1.5;
                }
                .button {
                    display: inline-block;
                    padding: 1rem 2rem;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border: none;
                    border-radius: 1rem;
                    cursor: pointer;
                }
        
                /* Style the button when hovering */
                .button:hover {
                    background-color: #0056b3;
                }
        
        
            </style>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Сайн уу, Unshy-д тавтай морил !!!</h1>
                </div>
                <div class="content">
                    <p>Зээ энэ өдрийн амар амгаланг айлтгая.</p>
                    <p>Та яг одоо МУИС-ын эрхээр нэвтрэх гэж байна !!!</p>
                    <a href=${link} class="button">Нэвтрэх</a>
                </div>
                <a></a>
            </div>
        </body>
        </html>`;

        await sendMail({ email, subject: "Цахим шуудан баталгаажуулах",content:content});
        res.status(200).json({
            status: 200,
            description: "Mail Sent!!",
            result: true,
        });
    } catch (err) {
        return next(ApiError.badRequest(errorM.ERR_EMAIL)); // Handle errors and return an appropriate response
    }

});


module.exports = router;
