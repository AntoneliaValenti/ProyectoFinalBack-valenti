const generateUserErrorInfo = (data) => {
    return `Uno o más propiedades fueron incompletas o no son válidas.
    Lista de propiedades requeridas:
    - firstname: type String, recibido: ${data.name}
    - mail: type String, recibido: ${data.price}`
}



module.exports = generateUserErrorInfo