// Credenciales correctas
const usuarioCorrecto = "admin";
const contraseñaCorrecta = "guelo708";

let intentos = 0;

// Referencias al DOM
const botonLogin = document.querySelector(".boton");
const campoUsuario = document.getElementById("usuario");
const campoClave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");

botonLogin.addEventListener("click", () => {
  const usuario = campoUsuario.value;
  const contraseña = campoClave.value;

if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
  mensaje.textContent = `Bienvenido ${usuarioCorrecto}, ingreso con éxito`;
  mensaje.className = "success"; // aplica estilo verde
  window.location.href = "/pagosLinea.html"; // redirige a la página de pagos
} else {
  intentos++;
  if (intentos < 3) {
    mensaje.textContent = `Credenciales incorrectas. Te quedan ${3 - intentos} intentos`;
    mensaje.className = "error"; // aplica estilo naranja
  } else {
    mensaje.textContent = "Usuario bloqueado. Ha superado el número de intentos";
    mensaje.className = "blocked"; // aplica estilo rojo
    botonLogin.disabled = true;
  }
}
});