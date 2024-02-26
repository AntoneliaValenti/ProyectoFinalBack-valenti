const Cart = require ('../db/models/cart.model')

class CartManagerMongo {
    async addCart(carrito){
        try {
            await Cart.create(carrito)
            return "Carrito creado con exito"
        } catch(err) {
            return 'error: ' + err
        }
    }


 

}
module.exports = CartManagerMongo