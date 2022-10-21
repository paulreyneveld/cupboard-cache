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
        }
    }, 
    { strict: false }
)

module.exports = User = mongoose.model("users", UserSchema)
