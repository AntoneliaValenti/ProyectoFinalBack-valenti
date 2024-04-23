const mongoose = require('mongoose')


module.exports = {
    connect: () => {
        return mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce")
        .then(()=> {
            console.log('Base de datos conectada')



        }).catch((err) => {
            console.log(err)
        })
    }
}