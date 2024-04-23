const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "a.valenti3003@gmail.com",
        pass: "kxgkpbubzsthpdci"
    }
})

module.exports = transporter 
