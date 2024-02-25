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


    // async deleteCart(id) {
    //     try{
            
    //         await Product.deleteOne({_id:id})
    //         return (`Carrito vacio: ${id}`) 
    //     } catch (err) {
    //         return(`El carrito ${id} no existe`)
    //     }
    // } 

}
module.exports = CartManagerMongo