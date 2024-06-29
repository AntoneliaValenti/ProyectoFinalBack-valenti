const { Router } = require("express")
const route = new Router()

route.get("/login", (req, res) => {
  res.render("login")
})

route.get("/register", (req, res) => {
  res.render("register")
})

route.get("/allProducts", async(req, res) => {
  res.render("products")
})

route.get("/cart", (req, res) => {
  res.render("cart")
})


route.get("/profile", (req, res) => {
  const { firstname, lastname, mail, age, role } = req.session.passport.user
  res.render("current", { firstname, lastname, mail, age, role })
})

route.get("/change-role", (req, res) => {
  res.render("change-role")
})


route.get("/changeRoleAdmi", (req, res) => {
  res.render("changeRoleAdmi")
})


route.get("/allUsers", (req, res) => {
  res.render("UsersManager")
})


module.exports = route; 