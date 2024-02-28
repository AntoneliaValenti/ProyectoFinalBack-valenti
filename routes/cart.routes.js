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
    const { date, type } = req.body
    const response = await cartmanagerm.addCart({ date, type })
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
  
        cart.items = []
        await cart.save()
  
        return 'Contenido del carrito eliminado'
      } catch (err) {
        return 'Error: ' + err.message
      }
})

//Funcion encontrar producto dentro de un carrito:
const findCart = async () => {
let cart1 = await Cart.findOne({_id: '65dca47294982e10f0564e53'}).populate('products.product')
cart1.products.push({product: '65da6a60f4bb2843db8a0167'})
//console.log(JSON.stringify(cart1, null, '/t')) 


//actualizacion carrito
await Cart.updateOne({_id:'65dca47294982e10f0564e53'}, cart1)
}
findCart()


route.get('/cart', async (req, res) => {
    try {
        // Obtener el carrito y los datos necesarios
        const cart = await Cart.findOne({ _id: '65dca47294982e10f0564e53' }).populate('products.product')
        const data = {
            products: cart.products
        }

        // Renderizar la plantilla con los datos
        res.render('cart', data)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

module.exports = route