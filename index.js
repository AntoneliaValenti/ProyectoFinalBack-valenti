const express = require("express")
const MongoStorage = require("connect-mongo")
require('dotenv').config()
const port = process.env.PORT
const host = process.env.MONGOURL
const nodemailer = require('nodemailer')
const app = express()
const handlebars = require("express-handlebars")
const passport = require("passport")
const { initializePassport } = require("./modelo/config/passport")
const Database = require("./modelo/dao/db/index")
const prodRoute = require("./routes/products.routes")
const cartRoute = require("./routes/cart.routes")
const usersRoute = require("./routes/users.router")
const viewRoute = require("./routes/views.router")
const mockRoute = require("./routes/mock.routes")
const session = require("express-session")
//const {createHash} = require('./utils/bcrypts')
const transporter = require('./modelo/config/mail')


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
app.use("/api/mock", mockRoute)
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
app.set("views", __dirname + "/views") //
app.set("view engine", "handlebars")

//dotenv.config()

app.listen(port, () => {
  console.log(`server run on port ${port}`)
  //ejecuta db
  Database.connect()
})



