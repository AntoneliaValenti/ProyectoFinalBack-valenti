// const mongoose = require("mongoose")
// const Product = require('../../src/modelo/dao/db/models/product.model')
// const chai = require('chai')

// mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// const expect = chai.expect

// describe('Testing Product Dao', () => {
//     before(function (done) {
//         mongoose.connection.once('open', () => {
//             console.log('Connected to the database')
//             done()
//         }).on('error', (error) => {
//             console.log('Connection error:', error)
//             done(error)
//         });
//     });

//     beforeEach(function () {
//         this.timeout(5000)
//     })

//     // it('El dao debe devolver los productos en formato arreglo', async function () {
//     //     // Given
//     //     const emptyArray = []

//     //     // Then
//     //     const result = await this.Product.get();
//     //     // console.log(`El resultado es un array? : ${Array.isArray(result)}`);

//     //     // Assert
//     //     expect(result).to.be.deep.equal(emptyArray);
//     //     expect(Array.isArray(result)).to.be.ok;
//     //     expect(Array.isArray(result)).to.be.equal(true)
//     //     expect(result.length).to.be.deep.equal(emptyArray.length)

//     // })
//     it('El dao debe agregar un producto correctamente en la DB', async function () {
//         let mockProduct = {
//             title: 'Test Product',
//             price: 10.99,
//             category: 'dulce',
//             stock: 20,
//             owner: new mongoose.Types.ObjectId()
//         }

//         const result = await this.Product.create(mockProduct)
//         expect(result._id).to.be.ok;
//     })

//     afterEach(async function () {
//         await mongoose.connection.collections.products.drop()
//     })

//     // after(async function () {
//     //     await mongoose.connection.close()
//     // })
// })
