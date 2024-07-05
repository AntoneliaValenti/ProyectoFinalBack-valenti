const { requireAdmin, requirePremium, requireUser  } = require('../middleware/auth')


const { Router } = require("express")
const route = new Router()

route.get("/login", (req, res) => {
  res.render("login")
})

route.get("/register", (req, res) => {
  res.render("register")
})

route.get("/allProducts", requireAdmin(), async(req, res) => {
  res.render("products")
})

route.get("/cart", requireUser(), requirePremium(), (req, res) => {
  res.render("cart")
})


route.get("/profile", (req, res) => {
  const { firstname, lastname, mail, age, role } = req.session.passport.user
  res.render("current", { firstname, lastname, mail, age, role })
})

route.get("/change-role", requirePremium(), (req, res) => {
  res.render("change-role")
})


route.get("/changeRoleAdmi", requireAdmin(), (req, res) => {
  res.render("changeRoleAdmi")
})


route.get("/allUsers", requireAdmin(), (req, res) => {
  res.render("UsersManager")
})

route.get("/allProductsUser", requireUser(), (req, res) => {
  res.render("productsUser")
})

route.get("/productsPremium", requirePremium(), (req, res) => {
  res.render("productPremium")
})

module.exports = route; 