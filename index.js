const express = require('express')
const PORT = 8080 || process.env.PORT
const app = express()
const prodRoute = require('./routes/products.routes')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const Database = require('./dao/db/index')
const cartRoute = require('./routes/cart.routes')
const ProductsSchema = require('./dao/db/models/product.model')


const CartManagerMongo = require('./dao/db/cartManagerMongo')
const cm = new CartManagerMongo()   

//PRODUCTMANAGER
const ProductManager = require('./dao/db/productManagerMongo')
const pm = new ProductManager()

//MIDLEWARE(formatea el body)
app.use(express.json())
// Otro middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: true }))

//PUBLIC
app.use(express.static(__dirname+'/public'))

//ROUTES
app.use('/api/products', prodRoute)
app.use('/api/cart', cartRoute)

//ENGINE
app.engine('handlebars', handlebars.engine())  //inicializar
app.set('views', __dirname+'/views')  // 
app.set('view engine', 'handlebars')  

//SOCKET
const io = new Server(server)
io.on('connection', async (socket) =>{
    const prods = await getProds()
    socket.emit('welcome', prods)
    socket.on ('borrar', async (id) => {
      await delProd(id)
    })
    socket.on('new-message', (data) => {
        console.log('Nuevo mensaje:', data)
        render([data])
    })

})

//PAGINATE
async function paginate() {
    try {
      let res = await ProductsSchema.paginate({}, {limit: 4, page: 2})
        console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
paginate()



server.listen(PORT, ()=> {
    console.log(`server run on port ${PORT}`)
    //ejecuta db
    Database.connect()
})

//funciones que simulan los endpoint
const getProds = async () => {
    try{
        const prods = await pm.getProds()
        return prods ? prods : []
    } catch (er) {
        console.error(er)
        return []
    }
}

const delProd = async (id) => {
    try {
        const deleteId = await pm.deleteProduct(id)
        return  deleteId ? true : false
    } catch (er) {
        console.error(er)
        return false
    }
}


