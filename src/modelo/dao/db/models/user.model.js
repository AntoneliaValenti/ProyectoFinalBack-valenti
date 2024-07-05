const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        //required: true
    },
    lastname: {
        type: String,
        //required: true
    },
    mail: {
        type: String,
        unique: true
        //required: true
    },
    age: {
        type: Number,
        //required: true
    },
    password: {
        type: String,
        // required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carritos'
    },
    role: {
        type: String,
        enum: ["admin", "user", "premium"]
    },
    documents:  {
        identificacion: {
          name: String,
          reference: String
        },
        domicilio: {
          name: String,
          reference: String
        },
        estadoCuenta: {
          name: String,
          reference: String
        }
    },
    resetPasswordToken: {
    type: String
},
    resetPasswordExpires: {
    type: Date
},
    last_connection: {
        type: Date,
        default: Date.now
}
},
{
    timestamps: true,
        strict: false
}
)

const Users = mongoose.model('users', UsersSchema)

module.exports = Users