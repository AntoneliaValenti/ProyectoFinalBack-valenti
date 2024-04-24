const Cart = require('../dao/db/models/cart.model');

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

function agregarProductoAlCarrito(productId) {
    fetch('http://localhost:8080/api/products/agregarAlCarrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
        .then(response => {
            if (response.ok) {
                console.log('Producto agregado al carrito correctamente')

            } else {
                console.error('Error al agregar el producto al carrito')

            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error)

        })
}
agregarProductoAlCarrito()

module.exports = CartManagerMongo;
