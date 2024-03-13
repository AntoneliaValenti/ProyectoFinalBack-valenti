const express = require("express")
const { Router } = require("express")
const route = new Router()
const passport = require("passport")


route.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: "Error, usuario y/o contraseña incorrectos",
  }),
  async (req, res) => {
    try {
      res.redirect("/api/views/products");
    } catch (err) {
      console.error(err);
    }
  }
);


route.post(
  "/register",
  passport.authenticate("register", {
    failureMessage: "Error, usuario ya existe",
  }),
  (req, res) => {
    try {
      res.redirect("/api/views/login");
    } catch (err) {
      console.error(err);
    }
  }
);

route.get('/failedRegister', (req, res) => {
  res.send('Failed user register')
})

route.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("Failed Logout");
    res.send("Logout Ok").reditect("/login");
  });
});

module.exports = route;
