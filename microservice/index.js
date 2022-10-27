require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const Item = require("./Groceries")

// const User = require("./Users");
const app = express();
 
app.use(express.json());

app.get('/', async (req, res) => {
    let items
    try {
        items = await Item.find()
        console.log(items)
        res.send('working')
    }
    catch (err) {
        console.log(err)
    }
    
})

app.post('/add_eggs', async (req, res) => {
    const eggs = Item({
        name: "Eggs", cost: "2.49"
    })
    try {
        await eggs.save()
    } catch (err) {
        console.log(err)
    }
    res.status(201)
})


// DB Connect
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