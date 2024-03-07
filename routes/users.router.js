const express = require("express");
const { Router } = require("express");

const route = new Router();
const SessionManagerMongo = require("../dao/db/userManagerMongo");
const um = new SessionManagerMongo();

route.post("/login", async (req, res) => {
  let { username, password } = req.body;
  //USAR EL USERMANAGER PARA SABER SI EXISTE
  const response = await um.loginUser(username, password);
  console.log(response);
  if (response) {
    req.session.name = response.name;
    req.session.lastname = response.lastname;
    req.session.mail = response.mail;
    if (username == "adminCoder@coder.com" && password == "adminCod3r123") {
      req.session.admin = true;
    } else req.session.admin = false;

    res.redirect("/api/view/products");
  } else res.send("Usuario o contraseña incorrectos");
});
route.post("/register", async (req, res) => {
  try {
    const response = await um.registerUser(req.body);
    response ? res.redirect("/api/view/login") : res.send({ msg: false });
  } catch (err) {
    console.error(err);
  }
});
route.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("Failed Logout");
    res.send("Logout Ok").reditect("/login");
  });
});

module.exports = route;
