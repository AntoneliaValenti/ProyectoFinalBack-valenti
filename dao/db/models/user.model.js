const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'  // Referencia al modelo del carrito
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const Users = mongoose.model('users', UsersSchema)

module.exports = Users