const express = require("express")
const dotenv = require('dotenv')
const port = process.env.PORT
const host = process.env.MONGOURL
const app = express()
const MongoStorage = require("connect-mongo")
const prodRoute = require("./routes/products.routes")
const handlebars = require("express-handlebars")
const passport = require("passport")
const { initializePassport } = require("./config/passport.js")
const Database = require("./dao/db/index")
const cartRoute = require("./routes/cart.routes")
const session = require("express-session")
const usersRoute = require("./routes/users.router")
const viewRoute = require("./routes/views.router")
//const {createHash} = require('./utils/bcrypts')

app.use(
  session({
    store: MongoStorage.create({
      mongoUrl: host,
    }),
    secret: "secretCoder", 
    resave: true,
    saveUninitialized: true,
  })
)

//MIDLEWARE(formatea el body)
app.use(express.json())
// Otro middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: true }))

//PUBLIC
app.use(express.static(__dirname + "/public"))


initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use("/api/products", prodRoute)
app.use("/api/cart", cartRoute)
app.use("/api/view", viewRoute)
app.use("/api/session", usersRoute)

//ENGINE
app.engine("handlebars", handlebars.engine()) //inicializar
app.set("views", __dirname + "/views") //
app.set("view engine", "handlebars")

dotenv.config({ path: "/envExample" })

app.listen(port, () => {
  console.log(`server run on port ${port}`)
  //ejecuta db
  Database.connect()
})
