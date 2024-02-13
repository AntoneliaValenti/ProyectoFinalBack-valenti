const express = require('express')
const { Router } = require('express')
const Products = require('../dao/db/models/product.model')
const route = new Router()
const ProductManagerMongo = require('../dao/db/productManagerMongo')
const productmanagerm = new ProductManagerMongo()



route.get('/allProducts', async (req, res)=> {
  try {
    let resp = await Products.find()
    res.send({
      msg: 'Productos encontrados',
      data: resp
    })
  }catch (err) {
    console.log(err)
  }
 
})

route.post('/Products', async (req, res) => {
  console.log(req.body)
  try {
    const { name, price, category, stock } = req.body
    const response = await productmanagerm.addProduct({name, price, category, stock})
    res.json(response)
  }catch (err) {
    console.log(err)
  }
})
  
route.post('/createProd', async (req, res) => {
  try {
    await Products.create(req.body)
    res.status(201).send({
      msg: 'Productos creado',
      data: req.body
    })
  }catch (err) {
    console.log(err)
  }
})
//Routes
route.get('/mensaje', (req, res)=> {
    res.render("chat")
  })


module.exports = route