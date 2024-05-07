const express = require('express')
const { Router } = require('express')
const Product = require('../modelo/dao/db/models/product.model')
const route = new Router()
const ProductManagerMongo = require('../modelo/services/productManagerMongo')
const productmanagerm = new ProductManagerMongo()
const { requireAdmin } = require('../middleware/auth')
const { requireUser } = require('../middleware/auth')
const ProductDTO = require('../modelo/dto/products.dto')
const CustomError = require("../modelo/services/errors/CustomError")
const EErrors = require("../modelo/services/errors/enums")
const { generateUserErrorInfo } = require("../modelo/services/errors/messages/info")
//const er = require('../modelo/services/errors/middleware/index')

//funciona
route.get('/allProducts', requireUser, async (req, res)=> {
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

//funciona
route.post('/products', async (req, res, next) => {
 // try {
  console.log("generateUserErrorInfo:", generateUserErrorInfo)
    const { name, price, category, stock } = req.body

    if (!name || !price) {
      CustomError.createError({
        name:"ValidationError",
        message:"Propiedades requeridas faltantes o inválidas",
        cause:generateUserErrorInfo({name, price, category, stock}), 
        code:EErrors.INVALID_TYPES_ERROR,
      })
    }
    data = new ProductDTO(data);
    const response = await productmanagerm.addProduct(data)
    if (response)
      res.status(201).send({ msg: 'producto creado con éxito', data: true })
      res.json({ success: true, message: 'Producto agregado correctamente', data: response });
})

//     const response = await productmanagerm.addProduct({ name, price, category, stock });
//     res.json({ success: true, message: 'Producto agregado correctamente', data: response });

//   } catch (error) {
//     next(error)
//   }
// })


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

//route.use(er)

module.exports = route