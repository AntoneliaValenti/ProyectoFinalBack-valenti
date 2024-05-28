
const generateUserErrorInfo = (data) => {
    return `Uno o más propiedades fueron incompletas o no son válidas.
    Lista de propiedades requeridas:
    - Name: type String, recibido: ${data.name}
    - Price: type String, recibido: ${data.price}`
}

module.exports = { generateUserErrorInfo }
