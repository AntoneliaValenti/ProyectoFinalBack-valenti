const Cart = require('../db/models/cart.model');

class CartManagerMongo {
    async createCart(date, products) {
        try {
            const newCart = await Cart.create({ date, products });
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw error;
        }
    }
}

module.exports = CartManagerMongo;
