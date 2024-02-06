const express = require('express')
const { Router } = require('express')
const Products = require('../db/models/product.model')
const route = new Router()


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
// route.get('/', (req, res)=> {
//     res.render("home")
//   })


module.exports = route