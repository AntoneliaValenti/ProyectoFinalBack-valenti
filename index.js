const express = require("express");
const PORT = 8080 || process.env.PORT;
const app = express();
const MongoStorage = require("connect-mongo");
const prodRoute = require("./routes/products.routes");
const handlebars = require("express-handlebars");

const Database = require("./dao/db/index");
const cartRoute = require("./routes/cart.routes");
const session = require("express-session");
const usersRoute = require("./routes/users.router");
const viewRoute = require("./routes/views.router");

//MIDLEWARE(formatea el body)
app.use(express.json());
// Otro middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: true }));

//PUBLIC
app.use(express.static(__dirname + "/public"));

//SESSION
app.use(
  session({
    store: MongoStorage.create({
      mongoUrl:
        "mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce",
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);

//ROUTES
app.use("/api/products", prodRoute);
app.use("/api/cart", cartRoute);
app.use("/api/view", viewRoute);
app.use("/api/session", usersRoute);

//ENGINE
app.engine("handlebars", handlebars.engine()); //inicializar
app.set("views", __dirname + "/views"); //
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
  //ejecuta db
  Database.connect();
});
