

window.onload = User
async function User() {
const manager = document.querySelector('#usrsContainer')
const set = document.querySelector('#usrsSettings')
const response = await fetch('/api/session/allUsers')
const data = await response.json()

data.forEach(element => {
    const UserElement = document.createElement('div')
    UserElement.innerHTML = `<span>Email: ${element.mail}, Nombre: ${element.firstname}, Rol: ${element.role}</span>`
    manager.appendChild(UserElement)
});
const changerol = document.querySelector('#changerol')
changerol.addEventListener('click', async () => {
    const newRole = document.querySelector('#cmbbox').value
    const mail = document.querySelector('#txtemail').value

    const response = await fetch(`/api/session/changeRoleAdmi/${mail}/${newRole}`, {
    method: 'POST'
})
    const data = await response.json()
    console.log(data)
})

const deleteuser = document.querySelector('#deleteuser')
deleteuser.addEventListener('click', async () => {
    const mail = document.querySelector('#txtemail').value

    const response = await fetch(`/api/session/deleteUser/${mail}`, {
    method: 'DELETE'
})
    const data = await response.json()
    console.log(data)
    alert('usuario eliminado')
})

}
