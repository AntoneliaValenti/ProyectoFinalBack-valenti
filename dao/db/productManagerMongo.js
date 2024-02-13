const Product = require ('../models')

class ProductManagerMongo{
    async addProduct(pr){
        try {
            await Product.create(pr)
            return "Producto creado"
        } catch(err) {
            return 'error: ' + err
        }
    }
}
module.exports = ProductManagerMongo