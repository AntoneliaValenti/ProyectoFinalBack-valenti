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

route.get("/current", (req, res) => {
  res.render("current");
});

// route.get('/current', async (req, res) => {
//   try {
//     const user = req.user
//     if (!user) {
//       return res.redirect('/');
//     }

//     res.render('user_profile', { user: user })
//   } catch (error) {
//     console.error('Error al obtener el usuario actual:', error)
//     res.status(500).send('Error interno del servidor')
//   }
// })
// route.get("/loginGHub", (req, res) => {
//   res.render("github");
// });

module.exports = route;
