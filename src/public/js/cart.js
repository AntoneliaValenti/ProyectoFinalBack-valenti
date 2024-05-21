

function agregarProductoAlCarrito() {
    // ID del producto que deseas agregar al carrito
    const productId = '65da6a60f4bb2843db8a0167'

    
    $.ajax({
        url: '/api/products/Cart1', 
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ productId }),
        success: function(response) {
           
            alert(response.message)
        },
        error: function(error) {
           
            alert('Error al agregar el producto al carrito')
            console.error(error)
        }
    })
}

const render = () => {
    fetch('./cartProducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data.data)
        //const data = products || [];
        const html = data.data.products.map((elem) => {
          return `
            <div class="card">
              <p>${elem.product.name}</p>
              <p>${elem.product.price}</p>
            </div>
          `;
        }).join('');
  
        document.getElementById('caja').innerHTML = html;
      })
      .catch((error) => {
        console.error('Error1:', error.message);
      });
  };
  
  render();
window.onload = render  

// const render = (data)=> {
//     const html = data.map(elem =>{
//         return(
//             `
//                 <div class="card">
//                 <p>Email: ${elem.date}</p>
//                 <p>Mensaje: ${elem.products}</p>
//                 </div>    
//             ` 
//         )
//     }).join('')
//     document.getElementById('caja').innerHTML = html
//     console.log(data)
// }
