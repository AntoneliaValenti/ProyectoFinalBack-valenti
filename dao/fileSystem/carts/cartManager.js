const fs = require('fs').promises
const crypto = require('crypto')

class cartManager{

    constructor(){
        this.path = 'cart.json'
        this.carts = []
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf-8')
        const responseJSON = JSON.parse(response)
        return responseJSON
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts()
        const cart = carts.find(cart => cart.id === id)

        if (cart){
            return cart.products
        } else {
            console.log("Carrito no encontrado")
        }
    }

    newCart = async () => {
        //poner id
        const id = crypto.randomBytes(16).toString('hex')
        const newCart = {id, products: []}

        this.carts = await this.getCarts()
        this.carts.push(newCart)
        
        await fs.writeFile(this.path, JSON.stringify(this.carts))
    }

    addProductToCart = async (cart_id, product_id) => {
        const response= await this.getCarts()
        const index = carts.findIndex(cart=> cart.id === cart_id)

        if (index === 1){
            const CartProducts = await this.getCartProducts(cart_id)
            const ProductInIndex = CartProducts.findIndex(product => product.product_id === product_id)

            if (ProductInIndex === -1){
                CartProducts[ProductInIndex].quantity = CartProducts[ProductInIndex].quantity + 1
            } else {
                CartProducts.push({product_id, quantity : 1})
            }

            carts[index].products = CartProducts

            await fs.writeFle(this.path. JSON.stringify(cart))
                console.log ("Producto agregado al carrito")
            } else {
                console.log("no se encontro el carrito")
        }
    } 
}

module.exports = cartManager
