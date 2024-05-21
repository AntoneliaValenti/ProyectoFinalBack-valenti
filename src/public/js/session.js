const render = async () => {
  
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
   
}    
  
  
render()