const express = require('express')
const { Router } = require('express')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userModel = require('../modelo/dao/db/models/user.model');
const route = new Router()

const transporter = nodemailer.createTransport({
    service: 'hotmail', 
    auth: {
        user: 'lanto09@hotmail.com',
        pass: 'credil47'
    }
})

route.post('/forgot-password', async (req, res) => {
        const { email } = req.body;
        try {
            const user = await userModel.findOne({ mail: email })
            if (!user) {
                return res.status(400).send('Usuario no encontrado')
            }
    
            // Generar un token
            const token = crypto.randomBytes(20).toString('hex')
            const tokenExpiration = Date.now() + 3600000 // 1 hora
    
            user.resetPasswordToken = token
            user.resetPasswordExpires = tokenExpiration
            await user.save()
    
            // Enviar el correo electrónico con el enlace de restablecimiento
            const resetURL = `http://${req.headers.host}/reset-password/${token}`
            const mailOptions = {
                to: user.mail,
                from: 'lanto09@hotmail.com',
                subject: 'Restablecimiento de contraseña',
                text: `Por favor, haz clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso: \n\n ${resetURL}`
            }
    
            await transporter.sendMail(mailOptions)
    
            res.status(200).send('Correo de restablecimiento de contraseña enviado')
        } catch (error) {
            res.status(500).send('Error en el servidor')
        }
    })


module.exports = route