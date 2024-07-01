window.onload = ProductsU;

async function ProductsU() {
  const manager = document.querySelector('#card');
  const response = await fetch('/api/products/allProductsUser');
  const data = await response.json();

  data.forEach(element => {
    const UserElement = document.createElement('div');
    UserElement.innerHTML = `<span>Producto: ${element.title}, Precio: ${element.price}, Categoria: ${element.category}, Id: ${element._id}</span>`;
    manager.appendChild(UserElement);
  });
}