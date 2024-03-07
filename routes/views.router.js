const { Router } = require("express")
const route = new Router()

route.get("/login", (req, res) => {
  res.render("login")
});

route.get("/logout", (req, res) => {
  res.render("logout")
});

route.get("/profile", (req, res) => {
  res.render("profile")
})

route.get("/products", (req, res) => {
  res.render("products")
})
route.get("/cart", (req, res) => {
  res.render("cart")
})

module.exports = route