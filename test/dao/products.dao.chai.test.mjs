import { expect } from "chai"
import mongoose from "mongoose"
import Product from '../../src/modelo/dao/db/models/product.model.js'

before(async function() {
    await mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test", { useNewUrlParser: true, useUnifiedTopology: true });
})

describe('Testing Product Dao', () => {
    before(function () {
        this.Product = Product
    })

    beforeEach(function () {
        this.timeout(5000)
    })

    it('El dao debe devolver los productos en formato arreglo', async function () {
        const result = await this.Product.find();
        expect(result).to.be.an('array')
    })

    it('El dao debe agregar un producto correctamente en la DB', async function () {
        let mockProduct = {
            title: 'Test Product',
            price: 10.99,
            category: 'dulce',
            stock: 20,
            owner: new mongoose.Types.ObjectId()
        }

        const result = await this.Product.create(mockProduct)
        expect(result._id).to.be.ok;
    })

    // afterEach(async function () {
    //     await mongoose.connection.collections.products.drop()
    // })

    after(async function () {
        await mongoose.connection.close()
    })
})
