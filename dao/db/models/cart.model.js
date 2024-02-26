const mongoose = require('mongoose')

const CartsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    total: {
        type: Number, 
        required: true
    }
})

const Cart = mongoose.model('Cart', CartsSchema)

module.exports = Cart