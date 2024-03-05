const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    mail: {
        type: String,
        required: true
    },
    password: {
        required: true
    },
   
    age: {
        type: Number,
        required: true
    }
})



const Session = mongoose.model('Session', SessionSchema)

module.exports = Session