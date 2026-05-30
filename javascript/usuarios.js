async function cargarUsuarios() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "Cargando...";

  try {
    const respuesta = await fetch("https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios");
    if (!respuesta.ok) throw new Error("Error en la solicitud");

    const datos = await respuesta.json();
    resultado.innerHTML = "";

    // Validar si hay datos
    if (datos.length === 0) {
      const mensaje = document.createElement("p");
      mensaje.textContent = "No hay usuarios disponibles en este momento";
      mensaje.classList.add("vacio-amarillo"); 
      resultado.appendChild(mensaje);

    } else {
      datos.forEach(usuario => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", usuario.id);

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // Frente
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const img = document.createElement("img");
        img.src = usuario.avatar;
        img.alt = usuario.nombre;

        const nombre = document.createElement("h3");
        nombre.textContent = usuario.nombre;

        // Botones de acción
        const acciones = document.createElement("div");
        acciones.classList.add("acciones");

        const btnActualizar = document.createElement("button");
        btnActualizar.textContent = "Actualizar";
        btnActualizar.classList.add("btnActualizar");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btnEliminar");

        acciones.appendChild(btnActualizar);
        acciones.appendChild(btnEliminar);

        cardFront.appendChild(img);
        cardFront.appendChild(nombre);
        cardFront.appendChild(acciones);

        // Reverso
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const nombreCompleto = document.createElement("p");
        nombreCompleto.innerHTML = `<span class="label">Nombre completo:</span> <span class="valor">${usuario.nombre}</span>`;

        const celular = document.createElement("p");
        celular.classList.add("celular");
        celular.innerHTML = `<span class="label">Celular:</span> <span class="valor">${usuario.celular}</span>`;

        const correo = document.createElement("p");
        correo.classList.add("correo");
        correo.innerHTML = `<span class="label">Correo:</span> <span class="valor">${usuario.correo}</span>`;

        cardBack.appendChild(nombreCompleto);
        cardBack.appendChild(celular);
        cardBack.appendChild(correo);

        // Ensamblar tarjeta
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

     
        // Evento de clic para girar
card.addEventListener("click", (e) => {
  // Evita que los botones disparen el flip
  if (!e.target.classList.contains("btnActualizar") && !e.target.classList.contains("btnEliminar")) {
    card.classList.toggle("flipped");
  }

        });

        // Eventos de acción
        btnActualizar.addEventListener("click", () => mostrarFormularioActualizar(usuario));
        btnEliminar.addEventListener("click", () => eliminarUsuario(usuario.id));

        resultado.appendChild(card);
      });
    }

  } catch (error) {
    resultado.innerHTML = "No se pudieron cargar los datos. Intenta más tarde.";
    console.error(error);
  }
}

document.getElementById("btnCargar").addEventListener("click", cargarUsuarios);

// --- NUEVAS FUNCIONES ---

function mostrarFormularioActualizar(usuario) {
  const contenedor = document.getElementById("contenedorAcciones");
  contenedor.innerHTML = `
    <h3>Actualizar Usuario</h3>
    <form id="formActualizar">
      <input type="hidden" id="idUsuario" value="${usuario.id}">
      <label>Nombre:</label>
      <input type="text" id="nuevoNombre" value="${usuario.nombre}">
      <label>Correo:</label>
      <input type="email" id="nuevoCorreo" value="${usuario.correo}">
      <label>Celular:</label>
      <input type="text" id="nuevoCelular" value="${usuario.celular}">
      <button type="submit">Guardar cambios</button>
    </form>
  `;

  console.log("Formulario de actualización renderizado para:", usuario);

  // Capturar el formulario recién creado
  const form = document.getElementById("formActualizar");

  // Enganchar el evento de submit
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // evita reload

    console.log("Submit detectado, enviando PUT...");

    try {
      const respuesta = await fetch(`https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: document.getElementById("nuevoNombre").value,
          correo: document.getElementById("nuevoCorreo").value,
          celular: document.getElementById("nuevoCelular").value
        })
      });

      if (!respuesta.ok) throw new Error("Error en la actualización");

      alert("Usuario actualizado correctamente");
      cargarUsuarios(); // refresca la lista
      contenedor.innerHTML = ""; // limpia el formulario
    } catch (error) {
      alert("Error al actualizar usuario");
      console.error(error);
    }
  });
}




async function eliminarUsuario(id) {
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    try {
      await fetch(`https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios/${id}`, {
        method: "DELETE"
      });
      alert("Usuario eliminado correctamente");
      cargarUsuarios();
    } catch (error) {
      alert("Error al eliminar usuario");
      console.error(error);
    }
  }
}



