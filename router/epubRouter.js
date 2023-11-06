const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const EPUB=require('../models/epubFile')

const {verifyTokens}=require("../security/authenticate");
const ApiError = require("../error/apiError");
const errorM = require("../error/ErrorM");

require('dotenv').config()

// MongoDB connection
mongoose.connect(process.env.DB)
.then(()=>{
  console.log("connected mongo !!!");
});


router.use(express.json()); 
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

//Epub file huulah API
router.post("/upload", upload.fields([{ name: 'epub' }, { name: 'image' }]), async (req, res, next) => {

  const info=JSON.parse(req.body.info);
  try {
    const newEpub = new EPUB({
      data: req.files.epub[0].buffer,
      images: req.files.image[0].buffer,
      name:info.name,
      author:info.author,
      category:info.category,
      prime:info.prime
    });
    const savedEpub = await newEpub.save();
    res.json({ success: true, id: savedEpub.id });

  } catch (error) {
    console.log(error.errors)
    return next(ApiError.badRequest(error.errors.name.message));
  }
});

//Huulsan buh epub file-n id-g avah
router.get("/epubs", async (req, res, next) => {
  try {
    const epubs = await EPUB.find({}, "id"); 
    const epubIds = epubs.map((epub) => epub._id); 
    res.json({ success: true, ids: epubIds });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//Huulsan epub-g id-gaar ni tatah
router.get("/epub/:id", async (req, res, next) => {

  const token=req.headers.authorization;


  try {
    const epub = await EPUB.findById(req.params.id);
    if (!epub) {
      return next(ApiError.badRequest(errorM.EMPTY_DATA));
    }
    
    if(epub.prime){
      const verify_res=verifyTokens(token);
      if(!verify_res){
        return next(ApiError.badRequest(errorM.ERR_TOKEN));
      }
    }
    res.send(epub);
  }catch (error) {
      return next(ApiError.badRequest(errorM.EMPTY_DATA));
  }
});

module.exports = router;