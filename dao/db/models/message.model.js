const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    name: {
        type: email,
        unique: true,
        require: true
    },
    texto: {
        type: String, 
        require: true
    }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message