const mongoose = require('mongoose')

const CartsSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    products: {
        type:[
            {product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
            }
        ]
    }
})

CartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

const Cart = mongoose.model('Cart', CartsSchema)

module.exports = Cart