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
      res.redirect('/api/allProducts')
    } catch (err) {
      console.error(err)
    }
  }
)


route.post(
  "/register",
  passport.authenticate("register", {
    failureMessage: "Error, usuario ya existe",
  }),
  (req, res) => {
    try {
      res.redirect("/api/views/login")
    } catch (err) {
      console.error(err)
    }
  }
);

route.get('/failedRegister', (req, res) => {
  res.send('Failed user register')
})


route.get("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      err ? res.send(err) : res.redirect("/api/views/login")
    });
  } catch (err) {
    console.error(err)
  }
})

module.exports = route
