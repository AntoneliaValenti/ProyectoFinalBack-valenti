
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
