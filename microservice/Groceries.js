const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        cost: {
            type: String
        }
    }, 
    { strict: false }
)

module.exports = Item = mongoose.model("items", ItemSchema)