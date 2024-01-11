const socket = io()

const chatbox = document.querySelector("#chatbox")
let user

Swal.fire({
    title: "Bienvenido",
    html: `
        <input type="text" id="username" class="swal2-input" placeholder="Nombre de Usuario" required>
        <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" required>
    `,
    inputAttributes: {
        autocapitalize: 'off',
    },
    preConfirm: () => {
        return {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
        };
    },
    inputValidator: (result) => {
        if (!result.username || !result.email) {
            return 'Ambos campos son obligatorios';
        }
    },
    allowOutsideClick: false,
}).then((result) => {
    if (result.isConfirmed) {

        user = result.value.username;
        email = result.value.email;
        socket.emit("inicio", { user, email });
    }
});

chatbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        socket.emit("message", {
            user,
            email,
            message: e.target.value,
        });
        chatbox.value = ""
    }
});

socket.on("connected", (data) => {
    if (user !== undefined) {
        Swal.fire({
            text: `Nuevo usuario conectado: ${data}`,
            toast: true,
            position: "top-right",
        })
    }
})

socket.on("messages", (data) => {
    const log = document.querySelector("#messages")
    let messages = ""

    data.forEach((message) => {
        messages += `<strong>${message.user}</strong>: ${message.message} <br />`
    })

    log.innerHTML = messages
})
