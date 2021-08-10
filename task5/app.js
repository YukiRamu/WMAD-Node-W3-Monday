/* Task5
Validate a password with the following format:
Password at least 6 digits.
At least one lowercase
At least one uppercase
At least one special character from @ # $ % ^ & *
 */

const express = require("express");
const app = express();
const fs = require("fs");
const port = 6060;
const bodyParser = require("body-parser");
const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const validatePassword = (password) => {
  if (password.length < 6 || !password.match(pattern)) {
    console.log("invalid password");
  } else {
    console.log("valid password");
  }
};

app.post("/", (req, res) => {
  //To access POST variable use req.body()methods.
  console.log("password input is ", req.body.password);
  validatePassword(req.body.password);
});

app.get("/", (req, res) => {
  //read html
  fs.readFile("./index.html", (error, data) => {
    if (error) {
      throw error;
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });

});

app.listen(port, () => {
  console.log(`Application is running  on the port ${port}`);
});