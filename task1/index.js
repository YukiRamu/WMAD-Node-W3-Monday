const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

//use env file 
require('dotenv').config();
const port = process.env.PORT || 3000;

//set view engine
app.set("views", "views");
app.set("view engine", "ejs");

//router config
app.use("/", apiRouter);
app.use("/api", apiRouter);


//listen on port
app.listen(port, () => {
  console.log(`Application is running  on the port ${port}`);
});