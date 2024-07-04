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
    cartBtn.addEventListener('click', async () => {
        try {
            const userData = await fetch(`/api/session/currentUsers`);
            const data = await userData.json();

            const response = await fetch(`/api/cart/carts/${data.cart}`);


            if (response.ok) {
                const cart = await response.json();
                displayCart(cart);
            } else {
                const errorData = await response.json();
                alert(`Error al obtener el carrito: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            alert('Error al obtener el carrito');
        }
    });

    const compraTotal = document.querySelector('#tk-compra');
    compraTotal.addEventListener('click', async () => {
        try {
            const userData = await fetch(`/api/session/currentUsers`);
            const data = await userData.json();

            const response = await fetch(`/api/cart/${data.cart}/purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail: data.mail }),
            });

            if (response.ok) {
                await response.json();
                alert('Compra realizada correctamente y correo enviado');
            } else {
                const errorData = await response.json();
                console.error('Error al realizar la compra:', errorData);
                alert('Error al realizar la compra');
            }
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            alert('Error al obtener el carrito');
        }
    });

}
    function displayCart(cart) {
        const cartDiv = document.querySelector('#cartContents');
        cartDiv.innerHTML = '';

        cart.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `<span>Producto: ${product.product.title}, Precio: ${product.product.price}, Cantidad: ${product.amount}</span>`;
            cartDiv.appendChild(productElement);
        });
    }
