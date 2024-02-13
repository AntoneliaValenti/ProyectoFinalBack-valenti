const express = require('express')
const PORT = 8080 || process.env.PORT
const app = express()
const prodRoute = require('./routes/products.routes')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const Database = require('./dao/db/models/index')





//PRODUCTMANAGER
const ProductManager = require('./dao/fileSystem/Products/ProductManager')
const pm = new ProductManager()

//MIDLEWARE(formatea el body)
app.use(express.json())

//PUBLIC
app.use(express.static(__dirname+'/public'))

//ROUTES
app.use('/api/products', prodRoute)

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
    socket.emit('new-message', (data) => {
        console.log('Nuevo mensaje:', data)
    })
})




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


