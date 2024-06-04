const express = require('express')
const { Router } = require('express')
const Product = require('../modelo/dao/db/models/product.model')
const route = new Router()
const ProductManagerMongo = require('../modelo/services/productManagerMongo')
const productmanagerm = new ProductManagerMongo()
const { requireAdmin } = require('../middleware/auth')
const { requireUser } = require('../middleware/auth')
const { requirePremium } = require('../middleware/auth')
const ProductDTO = require('../modelo/dto/products.dto')
const CustomError = require("../modelo/services/errors/CustomError")
const EErrors = require("../modelo/services/errors/enums")
const { generateUserErrorInfo } = require("../modelo/services/errors/messages/user-creation-error.message")
const errorHandler = require('../modelo/services/errors/middleware/index')




//funciona
route.get('/allProducts', async (req, res)=> {
    try {
      let resp = await Product.find()
      res.render('product', { 
        msg: 'Productos encontrados',
        data: resp
      })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
})

// route.get('/IdProducts', async (req, res)=> {
//   try {
//     let resp = await Product.find({}, '_id')
//     res.render('product', { 
//       msg: 'Productos encontrados por Id',
//       data: resp
//     })
//   } catch (err) {
//     res.status(400).send({ error: err.message })
//   }
// })

route.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await Product.findById(productId)

    if (!user) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})

// //funciona
route.post('/products', async (req, res, next) => {
 // try {
    const { title, price, category, stock } = req.body

    if (!title || !price) {
      CustomError.createError({
        name:"ValidationError",
        message:"Propiedades requeridas faltantes o inválidas",
        cause:generateUserErrorInfo({title, price, category, stock}), 
        code: EErrors.INVALID_TYPES_ERROR,
      })
    }
    data = new ProductDTO(data);
    const response = await productmanagerm.addProduct(data)
    if (response)
      res.status(201).send({ msg: 'producto creado con éxito', data: true })
      res.json({ success: true, message: 'Producto agregado correctamente', data: response });
})

route.post('/productsPremium', requirePremium, async (req, res, next) => {
  try {
      const { title, price, category, stock } = req.body

      if (!title || !price) {
          throw CustomError.createError({
              name: "ValidationError",
              message: "Propiedades requeridas faltantes o inválidas",
              cause: generateUserErrorInfo({ title, price, category, stock }),
              code: EErrors.INVALID_TYPES_ERROR,
          });
      }

      const data = new ProductDTO({ title, price, category, stock })
      const response = await productmanagerm.addProduct(data)

      res.status(201).json({ success: true, message: 'Producto agregado correctamente', data: response })
  } catch (error) {
      next(error)
  }
})

//funciona
route.delete("/:pid", requireAdmin, async (req, res) => {
  try {
    const { pid } = req.params
     const resp = await productmanagerm.deleteProduct(pid)
    res.status(201).send(resp)
  }catch (err) {
    res.status(400).send({ error: err})
  }
})


route.delete("/premium/:pid", requirePremium, async (req, res, next) => {
  try {
    const { pid } = req.params
    const userId = req.user._id

    const product = await Product.findById(pid)

    if (!product) {
      return res.status(404).send({ error: "Producto no encontrado" })
    }

    if (product.owner !== userId) {
      return res.status(403).send({ error: "No tienes permiso para eliminar este producto" })
    }

    // Elimina el producto
    const resp = await productmanagerm.deleteProduct(pid)
    res.status(200).send({ success: true, message: "Producto eliminado correctamente", data: resp })
  } catch (err) {
    next(err)
  }
})

route.use(errorHandler)

module.exports = route