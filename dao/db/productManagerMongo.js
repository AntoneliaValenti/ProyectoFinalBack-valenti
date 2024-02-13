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
            console.log({name, price, category, stock})
            await Product.create({name, price, category, stock})
            return ("Producto guardado") 
        } catch (err) {
            return(err)
        }

    }

    async deleteProduct() {
   
} 
}



module.exports = ProductManagerMongo


// class ProductManagerMongo{
//     async addProduct(pr){
//         try {
//             await Product.create(pr)
//             return "Producto creado"
//         } catch(err) {
//             return 'error: ' + err
//         }
//     }
// }
// module.exports = ProductManagerMongo