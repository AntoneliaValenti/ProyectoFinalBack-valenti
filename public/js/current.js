const render = () => {
    fetch('/current')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data);
        const user = data.user;
        document.getElementById('firstname').textContent = user.firstname
        document.getElementById('lastname').textContent = user.lastname
        document.getElementById('email').textContent = user.mail
        document.getElementById('age').textContent = user.age
        document.getElementById('role').textContent = user.role
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }
  
  window.onload = render