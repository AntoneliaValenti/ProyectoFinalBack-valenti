const mongoose  = require("mongoose")
const Products = require('../../src/modelo/dao/db/models/product.model')
const Assert = require("assert")

mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test")

const assert = Assert.strict

describe('Testing Products Dao', () => {

    before(function () {
        this.Products = new Products()
    })

    beforeEach(function(){
        this.timeout(5000)
    })

    it('El dao debe devolver los productos en formato arreglo', async function() {

        const isArray = true

        const result = await this.Products.get()
         console.log(`El resultado es un array? : ${Array.isArray(result)}`)

        assert.strictEqual(Array.isArray(result), isArray)


    })

    it('El dao debe agregar un usuario correctamente en la DB', async function () {
        // Given
        let mockProduct = {
            title: 'Test Product',
            price: 10.99,
            category: 'dulce',
            stock: 20,
            owner: new mongoose.Types.ObjectId()
        }

        // Then
        const result = await this.Products.save(mockProduct);
        console.log(`resultado: ${result}`);

        // Assert
        assert.ok(result._id);

    })

    // after
    // aftereach
    afterEach(function () {
        mongoose.connection.collections.Products.drop();
    })
})







// const mongoose = require('mongoose');
// //const chai = require('chai');
// //const expect = chai.expect;
// const Product = require('../../src/modelo/dao/db/models/product.model')

// describe('Testing Products Dao', () => {
//     before(async () => {
//         // Conectar a la base de datos de prueba
//         await mongoose.connect('mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//     });

//     after(async () => {
//         // Desconectar de la base de datos
//         await mongoose.disconnect();
//     });

//     it('El dao debe devolver los productos en formato arreglo', async () => {
//         // Crear un producto de prueba
//         const testProduct = new Product({
//             title: 'Test Product',
//             price: 10.99,
//             category: 'dulce',
//             stock: 20,
//             owner: new mongoose.Types.ObjectId()  // Ajusta esto según sea necesario
//         });

//         await testProduct.save();

//         // Obtener productos de la base de datos
//         const products = await Product.find();
//         expect(products).to.be.an('array');
//         expect(products).to.have.lengthOf.at.least(1);

//         // Limpiar productos de prueba
//         await Product.deleteOne({ _id: testProduct._id });
//     });
// });
