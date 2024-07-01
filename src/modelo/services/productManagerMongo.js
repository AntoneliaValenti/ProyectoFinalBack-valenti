const Product = require('../dao/db/models/product.model');

class ProductManagerMongo {
    constructor() {
        this.products = [];
        this.id = 0;
        this.path = `${__dirname}/products.json`;
    }


    async getProds(id) {
        try {
              id = id.trim();
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('ID de producto no válido');
            }

            const product = await Product.findById(id);
            return product;
        } catch (err) {
            console.error('Error al obtener el producto:', err);
            throw new Error('Error al obtener el producto');
        }
    }

    async getAllProds() {
        try {
            const products = await Product.find();
            return products;
        } catch (err) {
            console.error('Error al obtener los productos:', err);
            throw new Error('Error al obtener los productos');
        }
    }

    async addProduct({ title, price, category, stock }) {
        console.log('Agregando producto:', title);
        try {
            await Product.create({ title, price, category, stock });
            console.log('Producto guardado:', title);
            return { message: 'Producto guardado' };
        } catch (err) {
            console.error('Error al agregar el producto:', err);
            throw new Error('Error al agregar el producto');
        }
    }

    async deleteProduct(id) {
        try {
            id = id.trim();
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('ID de producto no válido');
            }

            const result = await Product.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error('El producto no existe');
            }
            return { message: `Producto eliminado: ${id}` };
        } catch (err) {
            console.error('Error al eliminar el producto:', err);
            throw new Error('Error al eliminar el producto');
        }
    }
}

module.exports = ProductManagerMongo;
