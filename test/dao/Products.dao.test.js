const mongoose = require("mongoose")
const Product = require('../../src/modelo/dao/db/models/product.model')
const Assert = require("assert")

mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const assert = Assert.strict

describe('Testing Products Dao', () => {

    before(function (done) {
        mongoose.connection.once('open', () => {
            console.log('Connected to the database')
            done()
        }).on('error', (error) => {
            console.log('Connection error:', error)
            done(error)
        });
    });

    beforeEach(function(){
        this.timeout(5000)
    });

    it('El dao debe agregar un producto correctamente en la DB', async function () {
        // Given
        let mockProduct = {
            title: 'Test Product 2',
            price: 10.99,
            category: 'dulce',
            stock: 20,
            owner: new mongoose.Types.ObjectId()
        };

        // When
        const result = await Product.create(mockProduct); // Utilizar el método create de Mongoose

        // Assert
        assert.ok(result._id)
    });

    // afterEach(async function () {
    //     await mongoose.connection.collections.products.drop(); // Utilizar el nombre correcto de la colección en minúsculas
    // })

    after(async function() {
        await mongoose.connection.close()
    })
})

