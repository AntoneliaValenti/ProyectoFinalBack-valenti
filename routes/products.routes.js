const express = require('express')
const { Router } = require('express')
const Products = require('../dao/db/models/product.model')
const route = new Router()
const ProductManagerMongo = require('../dao/db/productManagerMongo')
const productmanagerm = new ProductManagerMongo()


//funciona
route.get('/allProducts', async (req, res)=> {
  try {
    let resp = await Products.find()
    res.send({
      msg: 'Productos encontrados',
      data: resp
    })
  }catch (err) {
    res.status(400).send({ error: err.message })
  }
 
})

//funciona
route.post('/Products', async (req, res) => {
  try {
    const { name, price, category, stock } = req.body
    const response = await productmanagerm.addProduct({ name, price, category, stock })
    res.json({ success: true, message: 'Producto agregado correctamente', data: response })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, error: { type: err.name, message: err.message } })
  }
})


//funciona
route.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
     const resp = await productmanagerm.deleteProduct(pid)
    res.status(201).send(resp)
  }catch (err) {
    res.status(400).send({ error: err})
  }
})



module.exports = route