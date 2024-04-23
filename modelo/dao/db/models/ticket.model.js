const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    Id: {
        type:[
            {carrito: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Carrito'
            }
            }
        ]
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    }
})

const Ticket = mongoose.model('Ticket', TicketSchema)

module.exports = Ticket