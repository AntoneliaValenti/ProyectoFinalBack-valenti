const socket = io()

socket.on('new-message', (data)=> {
    console.log(data)
    render(data)
})

const render = (data)=> {
    const html = data.map(elem =>{
        return(
            `
                <div class="card">
                <p>Email: ${elem.name}</p>
                <p>Mensaje: ${elem.text}</p>
                </div>    
            ` 
        )
    }).join('')
    document.getElementById('caja').innerHTML = html
    console.log(data)
}



const addMsj = () => {
    const email = document.getElementById("name").value
    const message = document.getElementById("text").value

    // Emitir el mensaje al servidor
    socket.emit('new-message', { name: email, text: message })

    // Limpiar los campos de entrada
    document.getElementById("name").value = ""
    document.getElementById("text").value = ""

    // Evitar que el formulario se envíe
    return false
}