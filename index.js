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
const Database = require("./modelo/dao/db/index")
const prodRoute = require("./src/routes/products.route")
const cartRoute = require("./src/routes/carts.route")
const usersRoute = require("./src/routes/user.route")
const viewRoute = require("./src/routes/view.route")
const mockRoute = require("./src/routes/mock.route")
const restablecerRoute = require("./src/routes/restablecer.route")
const contraseñaRoute = require("./src/routes/passport.route")
const session = require("express-session")
//const {createHash} = require('./utils/bcrypts')
const transporter = require('./src/config/mail')
// const errorHandler = require('./modelo/services/errors/middleware/index')
// const addLogger = require("./src/config/logger_CUSTOM")


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
app.use("/api/contraseña", contraseñaRoute)
//app.use(errorHandler)
app.use("/mail", async (req, res) => {
  try {
    const { id, code, purchase_datetime, amount, purchaser } = req.body
    const mailBody = `
        <div>
            <h2>Muchas gracias por su compra!</h2>
            <p>Detalles del ticket:</p>
            <ul>
                <li><strong>Código:</strong> ${code}</li>
                <li><strong>Fecha de compra:</strong> ${purchase_datetime}</li>
                <li><strong>Monto:</strong> ${amount}</li>
                <li><strong>Comprador:</strong> ${purchaser}</li>
            </ul>
        </div>
    `

    const mailOptions = {
      from: 'Ecommerce <a.valenti3003@gmail.com>',
      to: 'lanto09@hotmail.com',
      subject: 'Ticket de compra',
      html: mailBody
    }

    await transporter.sendMail(mailOptions)
    res.status(200).send('Correo electrónico enviado con éxito')
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error)
    res.status(500).send('Error interno del servidor al enviar el correo electrónico')
  }
})


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



