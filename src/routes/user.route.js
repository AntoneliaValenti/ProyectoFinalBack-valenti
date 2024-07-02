const express = require("express")
const { Router } = require("express")
const route = new Router()
const passport = require("passport")
const {faker} = require('@faker-js/faker')  
const userModel = require('../modelo/dao/db/models/user.model')


// Ruta para obtener todos los usuarios y renderizar la vista
route.get('/allUsers', async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// Ruta para cambiar el rol del usuario
route.post('/changeRoleAdmi/:userMail/:newRole', async (req, res) => {
  const { userMail } = req.params;
  const { newRole } = req.params;
  console.log(userMail, newRole)

  try {
    const user = await userModel.find({mail:userMail})
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await userModel.updateOne({mail: userMail}, {role: newRole})

  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para eliminar un usuario
route.delete('/deleteUser/:userMail', async (req, res) => {
  const { userMail } = req.params;

  try {
    const response = await  userModel.deleteOne({mail:userMail});
    console.log(response)

    if (response.deletedCount === 1) {
      res.status(201).json({ success: true, message: 'Usuario eliminado correctamente', data: response }) 
      console.log('Usuario eliminado exitosamente')
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
//menos admi
route.delete('/inactiveUsers', async (req, res) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)

    const inactiveUsers = await userModel.find({ last_connection: { $lt: thirtyMinutesAgo } });

    if (inactiveUsers.length === 0) {
      return res.status(200).json({ message: 'No hay usuarios inactivos para eliminar' });
    }

    const emailPromises = inactiveUsers.map(async (user) => {
      await userModel.deleteOne({ _id: user._id })
      sendDeletionEmail(user.mail, user.firstname)
    });

    await Promise.all(emailPromises)

    res.status(200).json({ message: `${inactiveUsers.length} usuarios inactivos eliminados y correos enviados` })
  } catch (error) {
    console.error('Error al eliminar usuarios inactivos:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})



//rutas solicitadas en desafios anteriores

route.post("/login", passport.authenticate("login", {
  failureMessage: "Error, usuario y/o contraseña incorrectos",
}),
  async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id)
      if (user) {
        user.last_connection = new Date()
        await user.save()
      }

      res.redirect('/api/view/profile')
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error en el servidor' })
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


route.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' })
    }
    res.clearCookie('connect.sid') 
    res.status(200).json({ message: 'Cierre de sesión exitoso' })
  })
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

route.post('/premium/:userId', async (req, res) => {
  const { userId } = req.params
  const { newRole } = req.body

  try {
    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const { identificacion, domicilio, estadoCuenta } = user.documents

    if (!identificacion || !domicilio || !estadoCuenta) {
      return res.status(400).json({ message: 'No se puede actualizar el rol a premium. Faltan documentos.' })
    }

    user.role = (newRole === 'admin') ? 'admin' : (newRole === 'user') ? 'user' : 'premium'
    await user.save()

    res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', user })
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})



route.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})

module.exports = route




