const express = require("express");
const app = express();

//middleware
const errorHandlerMiddleWare=require("./middleware/errorHandlerMiddleWare")
//router
const authRouter=require("./router/authRouter");



app.use("/api/auth", authRouter);


app.use(errorHandlerMiddleWare);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;