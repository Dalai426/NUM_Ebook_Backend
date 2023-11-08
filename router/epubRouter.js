const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const EPUB = require('../models/epubFile')
const Book = require('../models/bookInfo')

const { verifyTokens } = require("../security/authenticate");
const ApiError = require("../error/apiError");
const errorM = require("../error/ErrorM");
const ApiFilters=require("../utils/ApiFilters")

require('dotenv').config()

// MongoDB connection
mongoose.connect(process.env.DB)
  .then(() => {
    console.log("connected mongo !!!");
  });


router.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Epub file huulah API
router.post("/upload", upload.fields([{ name: 'epub' }, { name: 'image' }]), async (req, res, next) => {


  const info = JSON.parse(req.body.info);
  try {
    const newEpub = new EPUB({
      data: req.files.epub[0].buffer,
    });

    const savedEpub = await newEpub.save();
    const book = new Book({
      file: savedEpub.id,
      images: req.files.image[0].buffer,
      name: info.name,
      author: info.author,
      category: info.category,
      prime: info.prime
    });
    const savedBook = await book.save();
    res.json({ success: true, id: savedBook.id });

  } catch (error) {
    return next(ApiError.badRequest(error.errors.name.message));
  }

});

//Huulsan buh epub file-n id-g avah
router.post("/epubs", async (req, res, next) => {
  try {

    const resPerPage=req.body.resPerPage||20;
    console.log(req.body.resPerPage)
    const apiFilters=await new ApiFilters(Book, req.query).search();
    let books_filtered=await apiFilters.query;
    const filtered_count=books_filtered.length;
    
    apiFilters.pagination(resPerPage);

    books_filtered=await apiFilters.query.clone();
    res.status(200).json({ books:books_filtered, resPerPage, filtered_count});
  } catch (error) {
    console.log(error)
    return next(ApiError.badRequest(errorM.ERR));
  }
});


//Huulsan epub-g book id-gaar ni tatah
router.get("/epub/:id", async (req, res, next) => {

  const token = req.headers.authorization;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(ApiError.badRequest(errorM.EMPTY_DATA));
    }

    if (book.prime) {
      const verify_res = verifyTokens(token);
      if (!verify_res) {
        return next(ApiError.badRequest(errorM.ERR_TOKEN));
      }
    }
    const epub = await EPUB.findById(book.file);
    res.send(epub);
  } catch (error) {
    return next(ApiError.badRequest(errorM.EMPTY_DATA));
  }

});

module.exports = router;