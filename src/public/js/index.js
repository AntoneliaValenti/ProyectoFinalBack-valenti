document.addEventListener("DOMContentLoaded", function() {
    console.log("Cliente listo");
});




// const socket = io()

// socket.on('welcome', (data)=> {
//     console.log(data)
//     render(data)
// })

// const render = (data)=> {
//     const html = data.map(elem =>{
//         return(
//             `
//                 <div class="card">
//                 <p>Título: ${elem.title}</p>
//                 <p>Descripción: ${elem.desc}</p>
//                 <p>Código: ${elem.code}</p>
//                 <p>Precio: ${elem.price}</p>
//                 <p>Estado: ${elem.status}</p>
//                 <p>Stock: ${elem.stock}</p>
//                 <p>Categoría: ${elem.category}</p>
//                 <p>Ruta: ${elem.thumbnails}</p>
//                 </div>    
//             ` 
//         )
//     }).join('')
//     document.getElementById('caja').innerHTML = html
// }


// //eliminar
// const delProd = () => {
//     let delId = document.getElementById("txtId").value
//     socket.emit('borrar', delId)
//     return false
// }
