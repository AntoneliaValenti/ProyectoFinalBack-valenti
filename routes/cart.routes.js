const express = require('express')
const { Router } = require('express')
const Cart = require('../modelo/dao/db/models/cart.model')
const Product = require('../modelo/dao/db/models/product.model')
const Ticket = require('../modelo/dao/db/models/ticket.model')
const route = new Router()
const CartManagerMongo = require('../modelo/services/cartManagerMongo')
const cartmanagerm = new CartManagerMongo()
const { v4: uuidv4 } = require('uuid')


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

//Agregar prod al carrito
route.post('/agregarAlCarrito', async (req, res) => {
  const productId = req.body.productId
  const cartId = req.body.cartId

  try {
      const product = await Product.findById(productId)

      if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' })
      }

      let cart = await Cart.findById(cartId)

      if (!cart) {
          return res.status(404).json({ error: 'Carrito no encontrado' })
      }

      cart.products.push({ product: productId })

      await cart.save()

      res.status(200).json({ success: true, message: 'Producto agregado al carrito correctamente', cart })
  } catch (error) {
      console.error('Error al agregar el producto al carrito:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
  }
})

route.post('/:cid/purchase', async (req, res) => {
  const { cid: cartId } = req.params

  try {
      const cart = await Carrito.findById(cartId)

      if (!cart) {
          return res.status(404).json({ error: 'Carrito no encontrado' })
      }

      // Crea ticket 
      const ticket = new Ticket({
          carrito: cart._id,
          code: generateUniqueCode(),
          purchase_datetime: new Date(),
          amount: calculateTotalItems(cart),
          purchaser: req.user.email 
      })

      await ticket.save()

      await cart.remove()

      res.status(200).json({ success: true, message: 'Compra realizada correctamente', ticket })
  } catch (error) {
      console.error('Error al realizar la compra:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
  }
})

function generateUniqueCode() {
  return uuidv4()
}


function calculateTotalItems(cart) {
  let totalItems = 0

  cart.products.forEach(product => {
      totalItems += product.quantity
  })

  return totalItems
}

 





// //Funcion encontrar producto dentro de un carrito:
// const findCart = async () => {
// let cart1 = await Cart.findOne({_id: '65f755ac6bc2ebcc918a2cb2'}).populate('products.product')
// cart1.products.push({product: '65da6a60f4bb2843db8a0167'})
// //console.log(JSON.stringify(cart1, null, '/t')) 


// //actualizacion carrito
// await Cart.updateOne({_id:'65f755ac6bc2ebcc918a2cb2'}, cart1)
// }
// findCart()


// route.get('/cart', async (req, res) => {
//     res.render('cart')
// })

// route.get('/cartProducts', async (req, res) => {
//     try {
//         // Obtener el carrito y los datos necesarios
//         const cart = await Cart.findOne({ _id: '65f755ac6bc2ebcc918a2cb2' }).populate('products.product')
        
//         // Renderizar la plantilla con los datos
//         res.send({data: cart})
//     } catch (err) {
//         res.status(400).send({ error: err.message })
//     }
// })

module.exports = route