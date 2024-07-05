const express = require('express')
const { Router } = require('express')
const route = new Router()
const transporter = require('../config/mail')

route.post('/finalizarCompra', async (req, res) => {
    try {
      const { code, purchase_datetime, amount, purchaser } = req.body.ticket
      console.log(code, purchase_datetime, amount, purchaser)
      const mailBody = `
          <div>
              <h2>Muchas gracias por su compra!</h2>
              <p>Detalles del ticket:</p>
              <ul>
                  <li><strong>Código:</strong> ${code}</li>
                  <li><strong>Fecha de compra:</strong> ${purchase_datetime}</li>
                  <li><strong>Monto:</strong> ${amount}</li>
                  <li><strong>Comprador:</strong> ${purchaser}</li>
              </ul>
          </div>
      `
  
      const mailOptions = {
        from: 'Ecommerce <antuval09@gmail.com>',
        to: 'ramirostrologo@gmail.com',
        subject: 'Ticket de compra',
        html: mailBody
      }
  
      await transporter.sendMail(mailOptions)
      res.status(200).send('Correo electrónico enviado con éxito')
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error)
      res.status(500).send('Error interno del servidor al enviar el correo electrónico')
    }
  })


  module.exports = route