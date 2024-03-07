const { Router } = require("express");
const route = new Router();

route.get("/login", (req, res) => {
  res.render("login");
});

route.get("/register", (req, res) => {
  res.render("register");
});

route.get("/products", (req, res) => {
  res.render("products");
});
route.get("/cart", (req, res) => {
  res.render("cart");
});

module.exports = route;
