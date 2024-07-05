const express = require('express')
const { Router } = require('express')
const Product = require('../modelo/dao/db/models/product.model')
const userModel = require('../modelo/dao/db/models/user.model')
const route = new Router()
const ProductManagerMongo = require('../modelo/services/productManagerMongo')
const productmanagerm = new ProductManagerMongo()
const { requireAdmin } = require('../middleware/auth')
const { requirePremium } = require('../middleware/auth')
const ProductDTO = require('../modelo/dto/products.dto')
const CustomError = require("../modelo/services/errors/CustomError")
const EErrors = require("../modelo/services/errors/enums")
const { generateUserErrorInfo } = require("../modelo/services/errors/messages/user-creation-error.message")
const errorHandler = require('../modelo/services/errors/middleware/index')
const transporter = require('../config/mail')



//funciona Trae los productos para el Admi
route.get('/allProducts', async (req, res)=> {
    try {
      let resp = await Product.find()
      res.send(resp)
    } catch (error) {
      console.error('Error al obtener los :', error);
    res.status(500).json({ message: 'Error en el servidor' });
    }
})

//funciona Trae los productos para el Usuario
route.get('/allProductsUser', async (req, res)=> {
  try {
    let resp = await Product.find()
    res.send(resp)
  } catch (error) {
    console.error('Error al obtener los :', error);
  res.status(500).json({ message: 'Error en el servidor' });
  }
})

//funciona Trae los productos por id
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

// //funciona Crea productos por el Admi
route.post('/products', requireAdmin(), async (req, res, next) => {
  try {
      const { title, price, category, stock } = req.body

      if (!title || !price) {
          throw CustomError.createError({
              name: "ValidationError",
              message: "Propiedades requeridas faltantes o inválidas",
              cause: generateUserErrorInfo({ title, price, category, stock }),
              code: EErrors.INVALID_TYPES_ERROR,
          })
      }

      const productData = new ProductDTO({ title, price, category, stock })
      const response = await productmanagerm.addProduct(productData)

      res.status(201).json({ success: true, message: 'Producto agregado correctamente', data: response })
  } catch (error) {
      next(error)
  }
})

//funciona Crea productos por el Usuario Premium
route.post('/productsPremium', requirePremium(), async (req, res, next) => {
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

//funciona Borra productos por Id
route.delete("/deleteProd/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productmanagerm.getProds(pid);
    if (!product) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }

    const resp = await productmanagerm.deleteProduct(pid);

    const user = await userModel.findById(product.ownerId);
    if (user && user.role === 'premium') {
      await sendDeletionEmail(user.mail, user.firstname, product.name);
    }

    res.status(201).send(resp);
  } catch (err) {
    console.error('Error al eliminar el producto:', err);
    res.status(400).send({ error: err });
  }
});


async function sendDeletionEmail(mail, firstName, productName) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: mail,
    subject: 'Producto eliminado',
    text: `Estimado ${firstName},\n\nTu producto "${productName}" ha sido eliminado del catálogo.\n\nSaludos,\nEquipo de Soporte`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
}

//funciona Borra productos por el Usuario premium
route.delete("/premium/:pid", requirePremium(), async (req, res, next) => {
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