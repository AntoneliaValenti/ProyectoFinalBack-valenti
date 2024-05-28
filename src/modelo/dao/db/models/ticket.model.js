const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
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