const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    price: {
        type: Number, 
        require: true
    },
    category: {
            type: String,
            require: true,
            enum: ['']
        },
    stock: {
        type: Number,
        default: 10
    }
})

const Product = mongoose.model('Product', ProductsSchema)

module.exports = Product