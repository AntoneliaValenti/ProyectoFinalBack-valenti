const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "antuval09@gmail.com",
        pass: "sjxyrkaodfdqhqff"
    }
})

module.exports = transporter 
