const { Router } = require("express")
const route = new Router()
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy


route.get('/github', passport.authenticate("github", {}), (req, res)=>{})
route.get('/', passport.authenticate("github", {}), (req, res)=>{

    
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({payload:"ok"})
})

route.post("/login", passport.authenticate("login", {
    failureMessage: "Error, usuario y/o contraseña incorrectos",
  }),
  async (req, res) => {
    try {
      res.ect('/api/sessions/current')
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
      res.redirect("/api/sessions/current")
    } catch (err) {
      console.error(err)
    }
  }
)

route.get('/failedRegister', (req, res) => {
  res.send('Failed user register')
})

route.get('/current', (req, res) => {
  if (req.isAuthenticated()) {
      res.render('current', { userData: req.users })
  } else {
      res.redirect('/api/sessions/current')
  }
})

module.exports = route