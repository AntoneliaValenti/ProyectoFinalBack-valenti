const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
  console.log('click')
  changeRole()
})

const changeRole = () => {
  const userId = document.getElementById('userId').value;
  const newRole = document.getElementById('newRole').value;
  
  fetch(`http://localhost:8080/api/session/change-role/${userId}`, { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newRole })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error al cambiar el rol del usuario')
    }
    return response.json()
})
.then(data => {
    alert(data.message)
    document.getElementById('changeRoleForm').reset()
})
.catch(error => {
    console.error('Error:', error)
    alert('Error al cambiar el rol del usuario')
})
}