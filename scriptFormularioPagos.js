const usuarioCorrecto = "admin";
const contraseñaCorrecta = "guelo708";

let intentos = 0;

const botonLogin = document.querySelector(".boton");
const campoUsuario = document.getElementById("usuario");
const campoClave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");
const extra = document.getElementById("extra");

botonLogin.addEventListener("click", () => {
  const usuario = campoUsuario.value;
  const contraseña = campoClave.value;

  // Limpia el área extra antes de cada intento
  extra.innerHTML = "";

  if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
    mensaje.textContent = `Bienvenido ${usuarioCorrecto}, ingreso con éxito`;
    mensaje.className = "success";
    window.location.href = "pagosLinea.html";
  } else {
    intentos++;
if (intentos < 3) {
  mensaje.textContent = `Credenciales incorrectas. Te quedan ${3 - intentos} intentos`;
  mensaje.className = "error";

  // Limpia el área extra antes de añadir un nuevo párrafo
  extra.innerHTML = "";

  // Crear un párrafo con appendChild
  const p = document.createElement("p");
  p.textContent = "Inténtalo nuevamente";
  p.className = "aviso"; // clase CSS para estilo
  extra.appendChild(p);
}

     else {
      mensaje.textContent = "Usuario bloqueado. Ha superado el número de intentos";
      mensaje.className = "blocked";
      botonLogin.disabled = true;
    }
  }
});