const faker = require('@faker-js/faker/locale/es')

const generateProduct = () => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push({
            id: faker.database.mongodbObjectId(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            category: faker.commerce.category(),
            stock: faker.number.int({ min: 0, max: 20 })
        })
    }
    return products
}

module.exports = generateProduct