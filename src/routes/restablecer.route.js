const express = require('express')
const { Router } = require('express')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const userModel = require('../modelo/dao/db/models/user.model')
const route = new Router()
const createHash = require('../modelo/utils/bcrypts')

const transporter = nodemailer.createTransport({
    service: 'hotmail', 
    auth: {
        user: 'lanto09@hotmail.com',
        pass: 'credil47'
    }
})

route.get('/forgot-password', (req, res) => {
    res.render('forgot-password')
})

route.post('/forgot-password', async (req, res) => {
        const { mail } = req.body;
        try {
            const user = await userModel.findOne({ mail: mail })
            if (!user) {
                return res.status(400).send('Usuario no encontrado')
            }
    
            const token = crypto.randomBytes(20).toString('hex')
            const tokenExpiration = Date.now() + 3600000 
    
            user.resetPasswordToken = token
            user.resetPasswordExpires = tokenExpiration
            await user.save()
    
            const resetURL = `http://${req.headers.host}/api/reset/reset-password/${token}`
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

    route.get('/reset-password/:token', async (req, res) => {
        try {
            const user = await userModel.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            });
    
            if (!user) {
                return res.status(400).send('El token de restablecimiento de contraseña es inválido o ha expirado')
            }
    
            res.render('reset-password', { token: req.params.token })
        } catch (error) {
            res.status(500).send('Error en el servidor')
        }
    });
    
    // actualizar la contraseña
    route.post('/reset-password/:token', async (req, res) => {
        try {
            const user = await userModel.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            });
    
            if (!user) {
                return res.status(400).send('El token de restablecimiento de contraseña es inválido o ha expirado');
            }
    
            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).send('Las contraseñas no coinciden');
            }
    
            user.password = createHash(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
    
            res.status(200).send('Contraseña actualizada correctamente');
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    });

module.exports = route