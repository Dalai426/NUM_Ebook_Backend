const express = require("express");
const app = express();
var cors = require('cors')

//middleware
const errorHandlerMiddleWare=require("./middleware/errorHandlerMiddleWare")
//router
const authRouter=require("./router/authRouter");
const epubFileRouter=require("./router/epubRouter");

app.use(cors()) 
app.use("/api/auth", authRouter);
app.use("/", epubFileRouter);

app.use(errorHandlerMiddleWare);


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;