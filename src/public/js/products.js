window.onload = Products;

async function Products() {
  const manager = document.querySelector('#card');
  const response = await fetch('/api/products/allProducts');
  const data = await response.json();

  data.forEach(element => {
    const UserElement = document.createElement('div');
    UserElement.innerHTML = `<span>Producto: ${element.title}, Precio: ${element.price}, Categoria: ${element.category}, Id: ${element._id}</span>`;
    manager.appendChild(UserElement);
  });

  const deleteProd = document.querySelector('#deleteProd');
  deleteProd.addEventListener('click', async () => {
    const pid = document.querySelector('#pid').value;

    try {
      const response = await fetch(`/api/products/deleteProd/${pid}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert(data.message || data.error);  
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto');
    }
  });
}