const express = require("express")
const { Router } = require("express")
const route = new Router()
const passport = require("passport")


route.post("/login", passport.authenticate("login", {
    failureMessage: "Error, usuario y/o contraseña incorrectos",
  }),
  async (req, res) => {
    try {
      res.redirect('/api/view/profile')
    } catch (err) {
      console.error(err)
    }
  }
)


route.post("/register", passport.authenticate("register", {
    failureMessage: "Error, usuario ya existe",
  }),
  (req, res) => {
    try {
      res.redirect("/api/view/profile")
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

route.get('/github', passport.authenticate("github", {}), (req, res) => { })
route.get('/loginGHub', passport.authenticate("github", {}), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.status(200).json({ payload:"ok"})
})


route.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
      res.render('current', { userData: req.user })
   } else {
      res.redirect('/api/views/profile')
  }
})

route.get("/loginGHub", (req, res) => {
  res.render("github")
})


module.exports = route
