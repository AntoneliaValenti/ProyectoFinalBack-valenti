const Cart = require ('../models')

class CartManagerMongo{
    async addMessage(carrito){
        try {
            await Cart.create(carrito)
            return "Mensaje enviado"
        } catch(err) {
            return 'error: ' + err
        }
    }
}
module.exports = CartManagerMongo