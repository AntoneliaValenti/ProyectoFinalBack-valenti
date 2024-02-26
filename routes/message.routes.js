const express = require('express')
const { Router } = require('express')
const Messages = require('../dao/db/models/message.model')
const route = new Router()
const MessageManagerMongo = require('../dao/db/messageManagerMongo')
const messagemanagerm = new MessageManagerMongo()


route.get('/allMessage', async (req, res)=> {
    try {
      let resp = await Messages.find()
      res.send({
        msg: 'Mensajes encontrados',
        data: resp
      })
    }catch (err) {
      res.status(400).send({ error: err.message })
    }
   
  })

  route.post('/Message', async (req, res) => {
    try {
      const { name, texto } = req.body
      const response = await messagemanagerm.addMessage({ name, texto })
      res.json({ success: true, message: 'Mensaje enviado correctamente', data: response })
    } catch (err) {
      console.error(err)
      res.status(400).json({ success: false, error: { type: err.name, message: err.message } })
    }
  })

  module.exports = route