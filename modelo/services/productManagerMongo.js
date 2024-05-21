const Product = require ('../dao/db/models/product.model')

class ProductManagerMongo {
    constructor() {
        this.products = []
        this.id = 0
        this.path = `${__dirname}/products.json`
    }

    async getProds() {
        try {
            const products = await Product.find()
            return products
        } catch (err) {
            console.error(err)
            return []
        }
    }

    async addProduct({ title, price, category, stock }) {
        console.log('Agregando producto:', title)
        try {
          await Product.create({ title, price, category, stock })
          console.log('Producto guardado:', title)
          return 'Producto guardado'
        } catch (err) {
          console.error('Error al agregar el producto:', err)
          return err.message
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


