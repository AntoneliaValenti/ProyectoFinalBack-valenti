const express = require('express')
const { Router } = require('express')
const  generateProduct = require('../mock/mockingproducts')
const route = new Router()

route.get('/mock', generateProduct())

module.exports = route