const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const EPUB=require('../models/epubFile')
require('dotenv').config()

// MongoDB connection
mongoose.connect(process.env.DB)
.then(()=>{
  console.log("connected mongo !!!");
});

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// app.use(express.json());

//Epub file huulah API
router.post("/upload", upload.single("epub"), async (req, res, next) => {
  try {
    const newEpub = new EPUB({
      data: req.file.buffer
    });
    const savedEpub = await newEpub.save();
    res.json({ success: true, id: savedEpub.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Huulsan buh epub file-n id-g avah
router.get("/epubs", async (req, res, next) => {
  try {
    const epubs = await EPUB.find({}, "id"); // Only fetch the 'id' field
    const epubIds = epubs.map((epub) => epub._id); // Extract IDs
    res.json({ success: true, ids: epubIds });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Huulsan epub-g id-gaar ni tatah
router.get("/epub/:id", async (req, res, next) => {
  try {
    const epub = await EPUB.findById(req.params.id);
    if (!epub) {
      return res
        .status(404)
        .json({ success: false, message: "EPUB not found" });
    }

    res.set("Content-Type", "application/epub+zip");
    res.send(epub.data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;