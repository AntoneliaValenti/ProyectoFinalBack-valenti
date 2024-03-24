const { Router } = require("express")
const route = new Router()

route.get("/login", (req, res) => {
  res.render("login")
})

route.get("/register", (req, res) => {
  res.render("register")
})

route.get("/products", (req, res) => {
  res.render("products")
})

route.get("/cart", (req, res) => {
  res.render("cart")
})

route.get("/loginGHub", (req, res) => {
  res.render("github")
})

route.get("/profile", (req, res) => {
  res.render("current")
})

module.exports = route;
