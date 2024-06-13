import { expect } from "chai"
import supertest from "supertest"
import mongoose from "mongoose"

const requester = supertest('http://localhost:8080/')

mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test")

describe('Testing ecommerce App', () => {
    // before

    describe("Testing products Api", () => {
        // before

        // it 01
        it("Crear productos: El API POST /api/products/products debe crear un nuevo producto correctamente", async () => {
            // Given 
            let mockProduct = {
                title: 'Test Product 12',
                price: 10.99,
                category: 'dulce',
                stock: 20,
                owner: new mongoose.Types.ObjectId()
            };

            // Then
            const { body } = await requester.post('/api/products/products').send(mockProduct)

            // Assert
    
            expect(body).to.have.property('title', mockProduct.title)
            expect(body).to.have.property('price', mockProduct.price)
            expect(body).to.have.property('category', mockProduct.category)
            expect(body).to.have.property('stock', mockProduct.stock)
    
        })
    })
})

//expect(statusCode).is.eqls(404)
            //expect(_body.payload).is.ok.and.to.have.property('_id')