//primer intento, no dunciona. hay error

// const mongoose = require("mongoose");
// const { expect } = require("chai");
// const Product = require('../../src/modelo/dao/db/models/product.model');

// mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test");

// describe('Testing Product Dao', () => {
//     // before
//     before(function () {
//         this.Product = new Product();
//     });

//     beforeEach(function () {
//         this.timeout(5000);
//     });

//     it('El dao debe agregar un producto correctamente en la DB', async function () {
//         // Given
//         let mockProduct = {
//             title: 'Test Product 2',
//             price: 10.99,
//             category: 'dulce',
//             stock: 20,
//             owner: new mongoose.Types.ObjectId()
//         };

//         const result = await this.Product.save(mockProduct);

//         expect(result._id).to.be.ok;
//     });

//     afterEach(function () {
//         mongoose.connection.collections.users.drop();
//     });
// });



//segundo intento. Casi funciona
// const mongoose = require("mongoose");
// const Product = require('../../src/modelo/dao/db/models/product.model');

// mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test");

// describe('Testing Product Dao', () => {
//     let productId;
//     // before
//     before(function () {
//         this.Product = new Product();
//     });

//     beforeEach(function () {
//         this.timeout(5000);
//     });

//     it('El dao debe agregar un producto correctamente en la DB', async function () {
//         // Given
//         let mockProduct = {
//             title: 'Test Product 2',
//             price: 10.99,
//             category: 'dulce',
//             stock: 20,
//             owner: new mongoose.Types.ObjectId()
//         };

//         const result = await this.Product.save(mockProduct);

//         productId = result._id;
//         expect(result._id).to.be.ok;
//     });

//     // afterEach(function () {
//     //     mongoose.connection.collections.users.drop();
//     // });
// });






//tercer intento, no funciona. hay error
// (async () => {
//     const { expect } = await import('chai');

//     mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     describe('Testing Products Dao', function() {
//         this.timeout(5000);

//         before((done) => {
//             mongoose.connection.once('open', () => {
//                 console.log('Connected to the database');
//                 done();
//             }).on('error', (error) => {
//                 console.log('Connection error:', error);
//                 done(error);
//             });
//         });

//         it('El dao debe agregar un producto correctamente en la DB', async function() {
//             // Given
//             let mockProduct = {
//                 title: 'Test Product',
//                 price: 10.99,
//                 category: 'dulce',
//                 stock: 20,
//                 owner: new mongoose.Types.ObjectId()
//             };

//             // When
//             const result = await Product.save(mockProduct); // Utilizar el método create de Mongoose

//             // Assert
//             expect(result._id).to.be.ok;
//         });

//         // afterEach(async function () {
//         //     await mongoose.connection.collections.products.drop(); // Utilizar el nombre correcto de la colección en minúsculas
//         // });

//         after(async function() {
//             await mongoose.connection.close();
//         });
//     });

//     // Ejecutar las pruebas
//     run(); // Esta línea es necesaria para que Mocha ejecute las pruebas en un entorno de importación dinámica
// })();





//ejemplo copiado del profe, mismo error
// const mongoose = require("mongoose");
//  const Product = require('../../src/modelo/dao/db/models/product.model');
//  const chai = require("chai");

// mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test")


// const expect = chai.expect;

// describe('Testing Users Dao', () => {

//     // before
//     before(function () {
//         this.Product = new Product()
//     })

//     // beforeeach
//     beforeEach(function () {
//         this.timeout(5000); //time de espera ya que estamos usando una DB
//        // mongoose.connection.collections.users.drop();
//     })


//     //it_01
//     it('El dao debe devolver los usuarios en formato arreglo', async function () {
//         // Given
//         const emptyArray = []

//         // Then
//         const result = await this.Product.get();
//         // console.log(`El resultado es un array? : ${Array.isArray(result)}`);

//         // Assert
//         expect(result).to.be.deep.equal(emptyArray);
//         expect(Array.isArray(result)).to.be.ok;
//         expect(Array.isArray(result)).to.be.equal(true)
//         expect(result.length).to.be.deep.equal(emptyArray.length)

//     })



//     // after
//     // aftereach
//     // afterEach(function () {
//     //     mongoose.connection.collections.users.drop();
//     // })
// })