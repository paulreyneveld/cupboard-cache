// Importing modules
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./Users");
const app = express();
 
app.use(express.json());

app.get('/accessResource', (req, res)=>{  
    const token = req.headers.authorization.split(' ')[1]; 
    console.log(token)
    //Authorization: 'Bearer TOKEN'
    if(!token)
    {
        res.status(200).json({success:false, message: "Error! Token was not provided."});
    }
    //Decoding the token
    const decodedToken = jwt.verify(token, "secretkeyappearshere" );
    res.status(200).json({ success: true, data: { userId: decodedToken.userId, username: decodedToken.username }})    
})
 
// Handling post request
app.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
 
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        username: username,
        token: token,
      },
    });
});
 
// Handling post request
app.post("/signup", async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  const newUser = User({
    firstName,
    lastName,
    username,
    password
  });
 
  try {
    await newUser.save();
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, username: username },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res
    .status(201)
    .json({
      success: true,
      data: { userId: newUser.id,
          username: username, token: token },
    });
});
 
//Connecting to the database
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    app.listen("3000", () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error Occurred");
  });