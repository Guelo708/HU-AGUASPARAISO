// esta es la tabla donde se mostrarán los usuarios registrados
const API_URL ="https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios";

const btnRegistrarse = document.getElementById("btnRegistrarse");

btnRegistrarse.addEventListener("click", registrarUsuario);

async function registrarUsuario() {

    const nombre =
        document.getElementById("nombre").value;

    const email =
        document.getElementById("email").value;

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    if (
        !nombre ||
        !email ||
        !usuario ||
        !password
    ) {
        alert("Complete todos los campos");
        return;
    }

    const nuevoUsuario = {

        nombre: nombre,
        correo: email,
        usuario: usuario,
        password: password,

        avatar:
            "https://i.pravatar.cc/300"

    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoUsuario)
        });

        const data = await response.json();

        console.log(data);

        alert("Usuario registrado correctamente");

        document.getElementById("registroForm").reset();

    } catch (error) {
        console.error(error);
        alert("Error al registrar usuario");
    }
}