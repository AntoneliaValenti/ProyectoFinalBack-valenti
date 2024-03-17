const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    First_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true
    }, 
    mail: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    role: {
        type:String,
        enum:["admin", "usser"],
        default:"usser"
    }
})

const Users = mongoose.model('users', UsersSchema)

module.exports = Users