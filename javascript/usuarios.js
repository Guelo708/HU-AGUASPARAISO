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

        // Botón de acción (solo eliminar)
        const acciones = document.createElement("div");
        acciones.classList.add("acciones");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btnEliminar");

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
          if (!e.target.classList.contains("btnEliminar")) {
            card.classList.toggle("flipped");
          }
        });

        // Evento de eliminar
        btnEliminar.addEventListener("click", (e) => {
          e.stopPropagation();
          eliminarUsuario(usuario.id);
        });

        resultado.appendChild(card);
      });
    }

  } catch (error) {
    resultado.innerHTML = "No se pudieron cargar los datos. Intenta más tarde.";
    console.error(error);
  }
}

document.getElementById("btnCargar").addEventListener("click", cargarUsuarios);

// --- FUNCIÓN ELIMINAR ---
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



