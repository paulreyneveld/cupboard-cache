require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const Item = require("./Groceries")
const cors = require('cors')
const app = express()
 
app.use(express.json());
app.use(cors())

app.get('/groceries', async (req, res) => {
    let items
    try {
        items = await Item.find()
        console.log(items)
        res.json(items);
    }
    catch (err) {
        console.log(err)
    }
    
})

app.post('/add_items', async (req, res) => {
    data = [
      {
        name: "Eggs", cost: "2.49"
      },
      {
        name: "Potatoes", cost: "1.99"
      },
      {
        name: "Bread", cost: "2.49"
      },
      {
        name: "Bacon", cost: "7.49"
      },
      {
        name: "Milk", cost: "3.49"
      },
      {
        name: "Cheddar", cost: "4.49"
      },
      {
        name: "Bananas", cost: "0.99"
      },
      {
        name: "Apples", cost: "1.49"
      }
    ]

    try {
        data.forEach(item => {
          console.log(item)
          const new_value = Item(item)
          new_value.save()
        })
    } catch (err) {
        console.log(err)
    }
    res.json(data)
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