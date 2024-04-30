const Cart = require('../dao/db/models/cart.model')


class CartManagerMongo {
    async createCart(date, products) {
        try {
            const newCart = await Cart.create({ date, products })
            return newCart
        } catch (error) {
            console.error('Error al crear el carrito:', error)
            throw error;
        }
    }

    async agregarAlCarrito(cartId, productId) {
        try {
          let cart = await Cart.findOne({ _id: cartId })
          if (cart) {
            const existingProduct = cart.products.find(
              (prod) => prod.product._id.equals(productId)
            );
            if (existingProduct) {
              existingProduct.amount++
            } else {
              cart.products.push({ product: productId, amount: 1 })
            }
            await cart.save()
            return true
          } else {
            return false
          }
        } catch (err) {
          console.error(err)
          return false
        }
    }
      
      
    async eliminarDelCarrito(cartId, productId) {
      try {
        let cart = await Cart.findOne({ _id: cartId })
        if (cart) {
          const existingProduct = cart.products.find(
            (prod) => prod.product._id.equals(productId)
          );
          if (existingProduct) {
            if (existingProduct.amount > 1) {
              existingProduct.amount--
            } else {
              cart.products = cart.products.filter(
                (prod) => !prod.product._id.equals(productId)
              );
            }
            await cart.save()
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } catch (err) {
        console.error(err)
        return false
      }
    }
    

    async eliminarCart(id) {
        try {
          await Cart.updateOne({ _id: id }, { $set: { products: [] } })
          return true
        } catch (err) {
          console.error(err)
          return false
        }
      }
    

}



module.exports = CartManagerMongo
