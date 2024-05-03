const faker = require('@faker-js/faker/locale/es')

const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(), 
        stock: faker.number.int({ min: 0, max: 20 }),
    }
}

module.exports = generateProduct
