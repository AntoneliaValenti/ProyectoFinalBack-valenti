const { Router } = require("express")
const route = new Router()

route.get("/login", (req, res) => {
  res.render("login")
})

route.get("/register", (req, res) => {
  res.render("register")
})

route.get("/products", async(req, res) => {
  res.render("product")
})

route.get("/cart", (req, res) => {
  res.render("cart")
})

route.get("/profile", (req, res) => {
  const { firstname, lastname, mail, age, role } = req.session.passport.user
  res.render("current", { firstname, lastname, mail, age, role })
})

route.get("/restablecer", (req, res) => {
  res.render("restablecer")
})

module.exports = route; 