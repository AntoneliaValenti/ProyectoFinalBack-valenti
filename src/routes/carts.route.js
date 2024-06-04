const express = require('express')
const { Router } = require('express')
const Carrito = require('../modelo/dao/db/models/cart.model')
const Product = require('../modelo/dao/db/models/product.model')
const Ticket = require('../modelo/dao/db/models/ticket.model')
const route = new Router()
const CartManagerMongo = require('../modelo/services/cartManagerMongo')
const cartmanagerm = new CartManagerMongo()
const { v4: uuidv4 } = require('uuid')
const { requireAdmin } = require('../middleware/auth')
const { requireUser } = require('../middleware/auth')

//funciona
route.get('/allCart', requireAdmin,  async (req, res) => {
  try {
    let resp = await Carrito.find()
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



//Agregar prod al carrito Funciona
route.put('/agregarAlCarrito/:cartId/:productId', requireUser, async (req, res) => {
  try {
      let cartId = req.params.cartId;
      let productId = req.params.productId;
      let response = await cartmanagerm.agregarAlCarrito(cartId, productId);
      if (response) {
          res.status(201).send({
              msg: `Producto agregado con éxito al carrito`,
          });
      } else {
          res.status(404).send({
              msg: `Carrito ${cartId} no encontrado`,
          });
      }
  } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
  }
});


async (req, res) => {
  try {
    let cartId = req.params.cartId
    let productId = req.params.productId
    let response = await cartmanagerm.agregarAlCarrito(cartId, productId)
    if (response) {
      res.status(201).send({
        msg: `Producto agregado con éxito al carrito`,
      });
    } else {
      res.status(404).send({
        msg: `Carrito ${cartId} no encontrado`,
      })
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error)
  }
}

//Eliminar prod del carrito Funciona
route.delete('/eliminarProducto/:cartId/:productId', requireUser, async (req, res) => {
  try {
    let cartId = req.params.cartId
    let productId = req.params.productId
    let response = await cartmanagerm.eliminarDelCarrito(cartId, productId)
    
    if (response) {
      res.status(201).send({
        msg: `Producto eliminado con éxito`,
      });
    } else {
      res.status(404).send({
        msg: `Carrito ${cid} no encontrado o producto no existe`,
      });
    }
  } catch (err) {
    console.error(err);
  }
})


route.post('/:cid/purchase', async (req, res) => {
  const { cid: cartId } = req.params
  const mail = req.params.user.mail

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
      purchaser: mail
    })

    await ticket.save()

    if (ticket) {
      await cart.remove()

      res.status(200).json({ success: true, message: 'Compra realizada correctamente', ticket })
    } else {
      res.status(500).json({ error: 'Error al crear el ticket' })
    }
  } catch (error) {
    console.error('Error al realizar la compra:', error)
  }
})

function generateUniqueCode() {
  return uuidv4()
}


function calculateTotalItems(cart) {
  let totalItems = 0

  cart.products.forEach(product => {
    const productPrice = product.quantity * product.price
    totalPrice += productPrice
  })

  return totalItems
}


route.put('/eliminarCarrito/:cid', async (req, res) => {
  try {
    const id = req.params.cartId
    const response = await cartmanagerm.eliminarCart(id)
    if (response) {
      res.status(200).send({ msg: 'Carrito vacio' })
    } else {
      res.status(500).send({ msg: 'Error al vaciar carrito' })
    }
  } catch (error) {
    console.error(error)
  }
})
route.get('/carts/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await userModel.findById(cartId)

    if (!cart) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json(cart)
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})
// route.get('/cart/:cartId', async (req, res) => {
//   const { cartId } = req.params

//   try {
//     const cart = await Carrito.findById(cartId).populate('products.product')

//     if (!cart) {
//       return res.status(404).json({ message: 'Carrito no encontrado' })
//     }

//     res.status(200).json(cart)
//   } catch (error) {
//     console.error('Error al obtener el carrito:', error)
//     res.status(500).json({ message: 'Error en el servidor' })
//   }
// })


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