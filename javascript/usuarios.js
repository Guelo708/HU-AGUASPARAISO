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
  
  // Escoge la clase según el color que quieras
  //mensaje.classList.add("vacio-blanco");   // texto blanco
   mensaje.classList.add("vacio-amarillo"); // texto amarillo
  
  resultado.appendChild(mensaje);

} else {

datos.forEach(usuario => {
  const card = document.createElement("div");
  card.classList.add("card");

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

  cardFront.appendChild(img);
  cardFront.appendChild(nombre);


// Reverso
const cardBack = document.createElement("div");
cardBack.classList.add("card-back");

// Nombre completo
const nombreCompleto = document.createElement("p");
nombreCompleto.innerHTML = `<span class="label">Nombre completo:</span> <span class="valor">${usuario.nombre}</span>`;

// Celular
const celular = document.createElement("p");
celular.classList.add("celular");
celular.innerHTML = `<span class="label">Celular:</span> <span class="valor">${usuario.celular}</span>`;

// Correo
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
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
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

async function actualizarUsuario() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "Actualizando usuario...";

  try {
    // ID del usuario a actualizar (ejemplo: 1)
    const idUsuario = 1;

    // Datos nuevos
    const datosActualizados = {
      nombre: "Usuario Actualizado",
      correo: "nuevo_correo@example.com"
    };

    // Llamada PUT a la API
    const respuesta = await fetch(`https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios/${idUsuario}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados)
    });

    if (!respuesta.ok) throw new Error("Error al actualizar usuario");

    const usuarioActualizado = await respuesta.json();

    // Mostrar resultado en pantalla
    resultado.innerHTML = `
      <p>Usuario actualizado correctamente:</p>
      <p>ID: ${usuarioActualizado.id}</p>
      <p>Nombre: ${usuarioActualizado.nombre}</p>
      <p>Correo: ${usuarioActualizado.correo}</p>
    `;

  } catch (error) {
    resultado.innerHTML = "No se pudo actualizar el usuario.";
    console.error(error);
  }
}

document.getElementById("btnActualizar").addEventListener("click", actualizarUsuario);



