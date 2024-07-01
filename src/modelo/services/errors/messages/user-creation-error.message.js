
const generateUserErrorInfo = (data) => {
    return `Uno o más propiedades fueron incompletas o no son válidas.
    Lista de propiedades requeridas:
    - Title: type String, recibido: ${data.title}
    - Price: type String, recibido: ${data.price}`
}

module.exports = { generateUserErrorInfo }

// function generateUserErrorInfo({ title, price, category, stock }) {
//     return {
//       title,
//       price,
//       category,
//       stock,
//       message: `Error con los datos proporcionados. Título: ${title}, Precio: ${price}, Categoría: ${category}, Stock: ${stock}`
//     };
//   }
  
//   module.exports = { generateUserErrorInfo };
  