// Importing modules
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./Users");
const app = express();
const cors = require("cors")
 
app.use(express.json());
app.use(cors())

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
    const error = new Error("Error! Something went wrong.")
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once")
    return next(error)
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      "secretkeyappearshere",
      { expiresIn: "1m" }
    );
  } catch (err) {
    console.log(err)
    const error = new Error("Error! Something went wrong.");
    return next(error)
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
  console.log('hit it')
  const newUser = User({
    firstName,
    lastName,
    username,
    password
  });
 
  try {
    await newUser.save()
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error)
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, username: username },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    )
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
})

app.get('/groceries', (req, res) => {
  res.send('test')
})

app.post('/add_item', (req, res) => {
  const userId = req.body.userId
  const user = User.findById(userId)
  
  User.findById(userId)
    .then(user => {
      console.log(user.item)
      user.item.push({ name: req.body.name, cost: req.body.cost})
      user.save()
    })
    .catch(err => console.log(err))
  res.send('working')

})

app.post('/grocery_list', (req,res) => {
  const userId = req.body.userId
  User.findById(userId)
    .then(user => {
      if (user.item) {
        res.json(user.item)
      }
      else {
        res.json([])
      }
    })
    .catch(err => console.log(err))
})

app.post('/delete_item', (req, res) => {
  const userId = req.body.userId
  const itemId = req.body.itemId
  User.findById(userId)
    .then(user => {
      const updatedItems = user.item.filter(value => value.id !== itemId)
      user.item = updatedItems
      console.log(user)
      user.save()
      res.json(user.item)
    })
})

app.post('/purchase_item', (req, res) => {
  const userId = req.body.userId
  const itemId = req.body.itemId

  User.findById(userId)
    .then(user => {
      const updatedItems = user.item.filter(value => value.id !== itemId)
      user.item = updatedItems
      user.purchased.push({ name: req.body.name, cost: req.body.cost})
      user.save()
      res.json(user.item)
    })
})

app.post('/cupboard', (req,res) => {
  const userId = req.body.userId
  User.findById(userId)
    .then(user => {
      if (user.purchased) {
        res.json(user.purchased)
      }
      else {
        res.json([])
      }
    })
    .catch(err => console.log(err))
})

app.post('/delete_item_cupboard', (req, res) => {
  const userId = req.body.userId
  const itemId = req.body.itemId
  User.findById(userId)
    .then(user => {
      const updatedItems = user.purchased.filter(value => value.id !== itemId)
      user.purchased = updatedItems
      console.log(user)
      user.save()
      res.json(user.purchased)
    })
})
 
//Connecting to the database
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => { // Port config: Update this at some point. 
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error Occurred");
  })