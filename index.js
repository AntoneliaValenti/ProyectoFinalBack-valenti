const express = require("express")
const MongoStorage = require("connect-mongo")
require('dotenv').config()
const port = process.env.PORT
const host = process.env.MONGOURL
const config = require('./src/config/config')
const nodemailer = require('nodemailer')
const app = express()
const handlebars = require("express-handlebars")
const passport = require("passport")
const { initializePassport } = require("./src/config/passport")
const Database = require("./src/modelo/dao/db/index")
const prodRoute = require("./src/routes/products.route")
const cartRoute = require("./src/routes/carts.route")
const usersRoute = require("./src/routes/user.route")
const viewRoute = require("./src/routes/view.route")
const mockRoute = require("./src/routes/mock.route")
const mail = require("./src/routes/mail.route")
const restablecerRoute = require("./src/routes/restablecer.route")
const session = require("express-session")
//const {createHash} = require('./utils/bcrypts')
const transporter = require('./src/config/mail')
// const errorHandler = require('./modelo/services/errors/middleware/index')
// const addLogger = require("./src/config/logger_CUSTOM")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUIExpress = require("swagger-ui-express")

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

const swaggerOptions = {
  definition: {
    openapi:"3.0.1",
    info:  {
      title: "Documentacion Api Eccomerce",
      description: "Documentacion Api Eccomerce - para uso de swagger"
  }
},
  apis: ['./src/docs/**/*.yaml']
}
const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//MIDLEWARE(formatea el body)
app.use(express.json())
// Otro middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: true }))

//PUBLIC
app.use(express.static(__dirname + "/src/public"))

//app.use(addLogger)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use("/api/products", prodRoute)
app.use("/api/cart", cartRoute)
app.use("/api/view", viewRoute)
app.use("/api/session", usersRoute)
app.use("/api/mock", mockRoute)
app.use("/api/reset", restablecerRoute)
//app.use(errorHandler)
app.use("/api/mail", mail)


//ENGINE
app.engine("handlebars", handlebars.engine()) //inicializar
app.set("views", __dirname + "/src/views") //
app.set("view engine", "handlebars")




//dotenv.config()


app.listen(port, () => {
  console.log(`server run on port ${port}`)
  //ejecuta db
  Database.connect()
})



