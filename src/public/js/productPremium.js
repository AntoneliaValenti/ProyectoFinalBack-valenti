const render = () => {
    fetch('/productsPremium')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data);
        const product = data.product;
        document.getElementById('title').textContent = product.title
        document.getElementById('price').textContent = product.price
        document.getElementById('category').textContent = product.category
        document.getElementById('stock').textContent = product.stock
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }
  

  
  window.onload = render