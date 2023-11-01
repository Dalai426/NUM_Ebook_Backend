const express = require("express");
const router = express.Router();

const {validateNumEmail}=require("../utils/EmailValidation");
const ApiError=require("../error/apiError");
const errorM=require("../error/ErrorM");


router.post("/login/:email",async (req,res,next)=>{
    
    const email=req.params.email;

    if(!await validateNumEmail({email:email})){
        return next(ApiError.badRequest(errorM.WRONG_EMAIL));
    }
    
    res.send(email);
});


module.exports=router;
