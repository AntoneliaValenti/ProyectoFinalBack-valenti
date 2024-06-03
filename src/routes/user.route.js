const express = require("express")
const { Router } = require("express")
const route = new Router()
const passport = require("passport")
const {faker} = require('@faker-js/faker')  

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
)

route.get('/failedRegister', (req, res) => {
  res.send('Failed user register')
})


route.get("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      err ? res.send(err) : res.redirect("/api/view/login")
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
    res.redirect('/api/view/profile')
  }
})

// route.get("/loginGHub", (req, res) => {
//   res.render("github")
// })

route.get('/loggerTest', (req, res) => {
    let firstname = faker.name.firstname()
    let lastname = faker.name.lastName()
    let mail = faker.internet.mail()
    let age = faker.random.numeric(2)
    let password = faker.internet.password()
    res.send({firstname, lastname, mail, age, password})
})

route.post('/change-role/:userId', async (req, res) => {
  const { userId } = req.params
  const { newRole } = req.body

  try {
    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }


    user.role = (newRole === 'admin') ? 'admin' : (newRole === 'user') ? 'user' : 'premium'
    await user.save()


    res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', user })
  } catch (error) {

    console.error('Error al cambiar el rol del usuario:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})

module.exports = route