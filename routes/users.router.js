const express = require("express")
const { Router } = require("express")
const route = new Router()
const passport = require("passport")
const CustomError = require("../modelo/services/errors/CustomError")
const EErrors = require("../modelo/services/errors/enums")
const { generateUserErrorInfo } = require("../modelo/services/errors/messages/info")
const er = require('../modelo/services/errors/middleware/index')

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
      
      const {firstname, lastname, mail, age, password} = req.body
console.log("Usando generateUserErrorInfo:", generateUserErrorInfo)

      if (!firstname || !mail) {
        CustomError.createError({
          name: "user cration Error",
          cause: generateUserErrorInfo({ firstname, mail }),
          message: "Error al crear el usuario",
          code: EErrors.INVALID_TYPES_ERROR
          })
          const userDto = {
            firstname,
            lastname,
            mail,
            age,
            password
            
        }
        if (users.length === 0) {
            userDto.id = 1;
        } else {
            userDto.id = users[users.length - 1].id + 1;
        }
        users.push(userDto);
        res.status(201).send({ status: "success", payload: userDto })
} else {
    res.redirect("/api/view/profile")
  }
    } catch (err) {
     console.error(err)
    }
  }
)

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
route.get('/cbGithub', passport.authenticate("github", {}), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.status(200).json({ payload: "ok" })
})


route.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('current', { userData: req.user })
  } else {
    res.redirect('/api/views/profile')
  }
})

// route.get("/loginGHub", (req, res) => {
//   res.render("github")
// })

route.use(er)

module.exports = route
