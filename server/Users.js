const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        item: [{
            name: String,
            cost: String
        }],
        purchased: [{
            name: String,
            cost: String
        }]
    }, 
    { strict: false }
)

module.exports = User = mongoose.model("users", UserSchema)
