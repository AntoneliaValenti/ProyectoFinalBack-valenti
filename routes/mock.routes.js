const express = require('express')
const { Router } = require('express')
const generateProduct = require('../mock/mockingproducts')

const route = new Router()


route.get('/mock', (req, res) => {
    const products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct())
    }
    //res.send({ status:"success", payload: products })

res.json({ products })
})

module.exports = route
