const socket = io()

socket.on('message', (data)=> {
    console.log(data)
    render(data)
})

const render = async () => {
    try {
      const response = await fetch('/api/products/cart')
   
      if (!response.ok) {
        console.log('Contenido de data:', data);

        throw new Error(`Error al obtener datos: ${response.statusText}`)
      }
     
      const data = await response.json()
  
      // Renderizar los datos en el DOM
      const html = data.map(elem => {
        return (
          `
            <div class="card">
              <p>Email: ${elem.name}</p>
              <p>Mensaje: ${elem.text}</p>
            </div>
          `
        )
      }).join('')
  
      document.getElementById('caja').innerHTML = html
      console.log(data)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  
  
  render()
  



// const render = (data)=> {
//     const html = data.map(elem =>{
//         return(
//             `
//                 <div class="card">
//                 <p>Email: ${elem.name}</p>
//                 <p>Mensaje: ${elem.text}</p>
//                 </div>    
//             ` 
//         )
//     }).join('')
//     document.getElementById('caja').innerHTML = html
//     console.log(data)
// }



// const addMessage = () => {
//     const email = document.getElementById("name").value
//     const message = document.getElementById("text").value
//     socket.emit('new-message', { name: email, text: message })

//     // Limpiar los campos de entrada
//     document.getElementById("name").value = ""
//     document.getElementById("text").value = ""

//     return false
// }