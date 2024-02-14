const Product = require ('../db/models/product.model')

class ProductManagerMongo {
    constructor() {
        this.products = []
        this.id = 0
        this.path = `${__dirname}/products.json`
    }

    async getProds() {
       
    }

    async addProduct({name, price, category, stock}) {
        
        try{
            await Product.create({name, price, category, stock})
            return ("Producto guardado") 
        } catch (err) {
            return(err)
        }

    }

    async deleteProduct(id) {
        try{
            
            await Product.deleteOne({_id:id})
            return (`Producto eliminado: ${id}`) 
        } catch (err) {
            return(`El producto ${id} no existe`)
        }
    } 
}



module.exports = ProductManagerMongo


