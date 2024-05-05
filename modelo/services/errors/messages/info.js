const generateUserErrorInfo = (user) => {
    return `Uno o más propiedades fueron incompletas o no son válidas.
    Lista de propiedades requeridas:
    - firstname: type String, recibido: ${user.firstname}
    - mail: type String, recibido: ${user.mail}`
}

module.exports = generateUserErrorInfo