
// esta es la tabla donde se registran los usuarios
const API_URL =
    "https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios";

const idUsuario = document.getElementById("idUsuario");
const nombre = document.getElementById("nombre");
const celular = document.getElementById("celular");
const email = document.getElementById("email");

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");

const tablaUsuarios =
    document.getElementById("tablaUsuarios");

async function obtenerUsuarios() {

    try {

        const response =
            await fetch(API_URL);

        const usuarios =
            await response.json();

        tablaUsuarios.innerHTML = "";

        usuarios.forEach(usuario => {

            tablaUsuarios.innerHTML += `
            <tr>

                <td>${usuario.id}</td>

                <td>${usuario.nombre}</td>

                <td>${usuario.celular}</td>

                <td>${usuario.correo}</td>

                <td>

                    <button
                    onclick="seleccionarUsuario(
                    '${usuario.id}',
                    '${usuario.nombre}',
                    '${usuario.celular}',
                    '${usuario.correo}'
                    )">

                    Seleccionar

                    </button>

                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.error(error);

    }
}

btnGuardar.addEventListener("click", async () => {

    const nuevoUsuario = {
        nombre: nombre.value,
        celular: celular.value,
        correo: email.value,
        avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${nombre.value}`
    };

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(nuevoUsuario)

        });

        limpiarFormulario();

        obtenerUsuarios();

        alert("Usuario registrado");

    } catch (error) {

        console.error(error);

    }

});

btnActualizar.addEventListener("click", async () => {

    if (!idUsuario.value) {

        alert("Seleccione un usuario");

        return;
    }

    const usuarioActualizado = {

        nombre: nombre.value,
        celular: celular.value,
        correo: email.value

    };

    try {

        await fetch(
            `${API_URL}/${idUsuario.value}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(
                    usuarioActualizado
                )

            });

        limpiarFormulario();

        obtenerUsuarios();

        alert("Usuario actualizado");

    } catch (error) {

        console.error(error);

    }

});

btnEliminar.addEventListener("click", async () => {

    if (!idUsuario.value) {

        alert("Seleccione un usuario");

        return;
    }

    const confirmar =
        confirm(
            "¿Desea eliminar este usuario?"
        );

    if (!confirmar) return;

    try {

        await fetch(
            `${API_URL}/${idUsuario.value}`,
            {
                method: "DELETE"
            });

        limpiarFormulario();

        obtenerUsuarios();

        alert("Usuario eliminado");

    } catch (error) {

        console.error(error);

    }

});

function limpiarFormulario() {

    idUsuario.value = "";
    nombre.value = "";
    celular.value = "";
    email.value = "";

}

function seleccionarUsuario(id, nombreUsuario, celularUsuario, correoUsuario) {

    idUsuario.value = id;
    nombre.value = nombreUsuario;
    celular.value = celularUsuario;
    email.value = correoUsuario;

}

obtenerUsuarios();