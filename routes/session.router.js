const { Router } = require("express")
const route = new Router()
const passport = require('passport')

route.get('/github', passport.authenticate("github", {}), (req, res)=>{})
route.get('/', passport.authenticate("github", {}), (req, res)=>{

    
    res.setHeader('Content-Type', 'application/json')
     res.status(200).json({payload:"ok"})
})



module.exports = route