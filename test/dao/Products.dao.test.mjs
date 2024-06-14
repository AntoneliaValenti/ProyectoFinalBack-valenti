import mongoose from "mongoose"
import Users from '../../src/modelo/dao/db/models/user.model.js'
import { expect } from 'chai'
import supertest from "supertest"

const requester = supertest('http://localhost:8080')

mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

describe('Testing Products Dao', () => {

    before(function (done) {
        mongoose.connection.once('open', () => {
            console.log('Connected to the database')
            done()
        }).on('error', (error) => {
            console.log('Connection error:', error)
            done(error)
        })
    })

    beforeEach(async function () {
        this.timeout(6000);
        // Limpiar la colección de usuarios antes de cada prueba
        await Users.deleteMany({})
    })

    it('El dao debe agregar un producto correctamente en la DB', async function () {
        // Given
        let mockUser = {
            firstname: "nnnnn",
            lastname: "xxxx",
            mail: "dulce@gmail.com",
            age: 20,
            pasword: 1234
        }

        // When
        const result = await Users.create(mockUser)

        // Assert
        expect(result).to.have.property('_id')
    })

    after(async function () {
        await mongoose.connection.close()
    })

    it('El dao debe devolver los usuarios en formato arreglo', async function () {
        // Given
        let mockUser = {
            firstname: "nnnnn",
            lastname: "xxxx",
            mail: "dulce@gmail.com",
            age: 20,
            pasword: 1234
        }

        await Users.create(mockUser)

        // Then
        const result = await Users.find()

        // Assert
        expect(result).to.be.an('array')
        expect(result.length).to.be.greaterThan(0)
    })

    describe('Testing ecommerce App', () => {
        describe("Testing product Api", () => {
            it("Crear productos: El API POST /api/products/products debe crear un nuevo product0 correctamente", async () => {
                // Given 
                let mockProduct = {
                    title: 'Test Product',
                    price: 10.99,
                    category: 'dulce',
                    stock: 20,
                    owner: mongoose.Types.ObjectId()
                }

                // When
                const { body } = await requester.post('/api/products/products').send(mockProduct)

                // Assert
                expect(body).to.have.property('title', mockProduct.title)
                expect(body).to.have.property('price', mockProduct.price)
                expect(body).to.have.property('category', mockProduct.category)
                expect(body).to.have.property('stock', mockProduct.stock)
            })
        })
    })
})
