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

    const addProdBtn = document.querySelector('#addProdBtn');
    addProdBtn.addEventListener('click', async () => {
        const productId = document.querySelector('#addProd').value.trim();

        if (!productId) {
            alert('Por favor, ingrese un ID de producto.');
            return;
        }

        try {
            console.log(`Agregando producto con ID: ${productId} al carrito con ID: ${cartId}`);
            const response = await fetch(`/api/cart/agregarAlCarrito/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Producto agregado al carrito');
            } else {
                const errorData = await response.json();
                alert(`Error al agregar el producto al carrito: ${errorData.msg}`);
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            alert('Error al agregar el producto al carrito');
        }
    });

    const cartBtn = document.querySelector('#cartUser');
    addProdBtn.addEventListener('click', async () =>{

    })
}