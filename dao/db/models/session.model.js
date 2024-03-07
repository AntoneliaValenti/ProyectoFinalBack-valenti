const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
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
    password: {
        type: String,
        required: true
    }
})



const Users = mongoose.model('users', UsersSchema)

module.exports = Users