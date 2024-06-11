const mongoose = require("mongoose");
const Product = require('../../src/modelo/dao/db/models/product.model');

(async () => {
    const { expect } = await import('chai');

    mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    describe('Testing Products Dao', function() {
        this.timeout(5000);

        before((done) => {
            mongoose.connection.once('open', () => {
                console.log('Connected to the database');
                done();
            }).on('error', (error) => {
                console.log('Connection error:', error);
                done(error);
            });
        });

        it('El dao debe agregar un producto correctamente en la DB', async function() {
            // Given
            let mockProduct = {
                title: 'Test Product',
                price: 10.99,
                category: 'dulce',
                stock: 20,
                owner: new mongoose.Types.ObjectId()
            };

            // When
            const result = await Product.create(mockProduct); // Utilizar el método create de Mongoose

            // Assert
            expect(result._id).to.be.ok;
        });

        // afterEach(async function () {
        //     await mongoose.connection.collections.products.drop(); // Utilizar el nombre correcto de la colección en minúsculas
        // });

        after(async function() {
            await mongoose.connection.close();
        });
    });

    // Ejecutar las pruebas
    run(); // Esta línea es necesaria para que Mocha ejecute las pruebas en un entorno de importación dinámica
})();
