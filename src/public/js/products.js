window.onload = Products
async function Products() {
  const manager = document.querySelector('#card')
  const set = document.querySelector('#cardProd')
  const response = await fetch('/api/products/allProducts')
  const data = await response.json()


  data.forEach(element => {
    const UserElement = document.createElement('div')
    UserElement.innerHTML = `<span>Producto: ${element.title}, Precio: ${element.price}, Categoria: ${element.category}</span>`
    manager.appendChild(UserElement)
})

const deleteProd = document.querySelector('#deleteProd')
deleteProd.addEventListener('click', async () => {

    const title = document.querySelector('#txttitle').value

    const response = await fetch(`/api/products/deleteProd/${title}`, {
    method: 'DELETE'
})
    const data = await response.json()
    console.log(data)
})

}


