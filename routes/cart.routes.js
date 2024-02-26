const express = require('express')
const { Router } = require('express')
const Cart = require('../dao/db/models/cart.model')
const route = new Router()
const CartManagerMongo = require('../dao/db/cartManagerMongo')
const cartmanagerm = new CartManagerMongo()


//funciona
route.get('/allCart', async (req, res) => {
    try {
      let resp = await Cart.find()
      res.send({
        msg: 'Carritos encontrados',
        data: resp
      })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })

//funciona
route.post('/Cart1', async (req, res) => {
  try {
    const { name, total } = req.body
    const response = await cartmanagerm.addCart({ name, total })
    res.json({ success: true, message: 'Carrito agregado correctamente al carrito', data: response })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, error: { type: err.name, message: err.message } })
  }
})


//funciona
route.delete("/:pid", async (cartId) => {
    try {
        const cart = await Cart.findById(cartId)
        if (!cart) {
          throw new Error('Carrito no encontrado')
        }
  
        // Limpiar contenido del carrito
        cart.items = []
        await cart.save()
  
        return 'Contenido del carrito eliminado'
      } catch (err) {
        return 'Error: ' + err.message
      }
})



module.exports = route