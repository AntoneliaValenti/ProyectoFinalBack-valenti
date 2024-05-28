const express = require('express')
const { Router } = require('express')
const userModel = require('../modelo/dao/db/models/user.model');
const route = new Router()

    route.get('/reset-password/:token', async (req, res) => {
        try {
            const user = await userModel.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            })
    
            if (!user) {
                return res.status(400).send('El token de restablecimiento de contraseña es inválido o ha expirado')
            }
    
            
            res.render('reset-password', { token: req.params.token })
        } catch (error) {
            res.status(500).send('Error en el servidor')
        }
    })
    
    // Ruta para actualizar la base de datos
    route.post('/reset-password/:token', async (req, res) => {
        try {
            const user = await userModel.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            })
    
            if (!user) {
                return res.status(400).send('El token de restablecimiento de contraseña es inválido o ha expirado')
            }
    
            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).send('Las contraseñas no coinciden')
            }
    
            // Actualiza la contraseña 
            user.password = createHash(req.body.password)
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            await user.save()
    
            res.status(200).send('Contraseña actualizada correctamente')
        } catch (error) {
            res.status(500).send('Error en el servidor')
        }
    })

module.exports = route