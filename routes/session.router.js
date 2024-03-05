const express = require('express')
const { Router } = require('express')
const route = new Router()


function auth(req, res, next){
    if(req.session.user == 'adminCoder@coder.com' && req.session.admin){
    return next()
    }
    return res.send('Error en la autenticacion, no autorizado')
}

app.get('/logingAdmi', (req, res) => {
    let { username, password } = req.query  
    if(username != 'adminCoder@coder.com' || password != 'adminCod3r123') {
    return res.send('Usuario o contraseña incorrectos')
    }
    req.session.user = username
    req.session.admin = true

    res.send('Administrador logueado! Bienvenido!').reditect('/productManagerMongo')
})

app.get('/logingUser', (req, res) => {
    let { username, password } = req.query  
    if(username != 'Anto@gmail.com' || password != '123456') {
    return res.send('Usuario o contraseña incorrectos')
    }
    req.session.user = username
    req.session.admin = true

    res.send('Usuario logueado! Bienvenido!').reditect('/productManagerMongo')
})

app.get('/profile', (req, res) => {
    res.send('Bienvenido!')
})

app.get('/setSession', (req, res) => {
req.session.user = 'userName',
req.session.admin = true

res.send('Usuario Logueado')
})



app.get('/getSession', (req, res) => {
    res.send(req.session)

})
        
app.get('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if (err) res.send('Failed Logout')
        res.send('Logout Ok').reditect('/loging')
    })
})

module.exports = route