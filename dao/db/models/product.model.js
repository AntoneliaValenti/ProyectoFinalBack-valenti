const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    category: {
            type: String,
            required: true,
            enum: ['amor', 'odio']
        },
    stock: {
        type: Number,
        default: 10
    }
})

const Product = mongoose.model('Product', ProductsSchema)

module.exports = Product