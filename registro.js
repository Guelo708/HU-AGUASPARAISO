// Seleccionar elementos del DOM
const registroForm = document.getElementById('registroForm');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');
const btnRegistrarse = document.getElementById('btnRegistrarse');
const areaResultados = document.getElementById('resultados');

// Base de datos de usuarios existentes
const usuariosRegistrados = [
    { usuario: 'jhordan', password: '123456', nombre: 'Jhordan', email: 'jhordan@gmail.com' },
    { usuario: 'admin', password: 'admin123', nombre: 'Administrador', email: 'admin@aguasparaiso.com' },
    { usuario: 'test', password: 'test123', nombre: 'Usuario Test', email: 'test@aguasparaiso.com' }
];

// array para almacenar nuevos usuarios registrados durante la sesión
let usuariosNuevos = [];

// Variable para controlar intentos
let intentos = 0;
const maxIntentos = 3;
let bloqueado = false;

// FUNCIÓN DE VALIDACIÓN DE CREDENCIALES
// esta funcion se encarga de verificar si el usuario y contraseña ingresados coinciden con algún usuario registrado en la base de datos (usuariosRegistrados).
function validarCredenciales(usuario, password) {
    const usuarioExistente = usuariosRegistrados.find(u => u.usuario === usuario && u.password === password);
    return usuarioExistente;
}

// FUNCIÓN DE VALIDAR EMAIL (regex para formato de email, que no tenga espacios, tenga un @ y .)
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// FUNCIÓN DE VALIDAR CONTRASEÑA 
function validarPassword(password) {
    return password.length >= 6;
}

// ========== FUNCIÓN DE REGISTRO ==========
function procesarRegistro() {
    // borra los campos una vez que se procesa el registro 
    areaResultados.innerHTML = '';

    // Obtener valores de los elementos del DOM y eliminar espacios con trim
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const usuario = inputUsuario.value.trim();
    const password = inputPassword.value.trim();

    // Validar que no estén vacíos (!not) 
    if (!nombre || !email || !usuario || !password) {
        mostrarError('Por favor, completa todos los campos');
        return;
    }

    // Validar email
    if (!validarEmail(email)) {
        mostrarError('El correo electrónico no es válido');
        return;
    }

    // Validar contraseña
    if (!validarPassword(password)) {
        mostrarError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Validar que el usuario no exista en la base de datos (usuariosRegistrados) o en los nuevos usuarios (some devuelve true si encuentra un usuario con el mismo nombre)
    const usuarioYaExiste = usuariosRegistrados.some(u => u.usuario === usuario) || usuariosNuevos.some(u => u.usuario === usuario);

    if (usuarioYaExiste) {
        mostrarError('El usuario ya existe. Por favor, elige otro');
        return;
    }

    // Si todo es válido, crear el nuevo usuario
    const nuevoUsuario = {
        usuario,
        password,
        nombre,
        email
    };

    // agregamos el nuevo usuario al array de usuarios nuevos y a la base de datos de usuarios registrados
    usuariosNuevos.push(nuevoUsuario);
    usuariosRegistrados.push(nuevoUsuario);

    // Mostrar mensaje de éxito con los datos del nuevo usuario
    mostrarExito(nombre, usuario, email);
    limpiarFormulario();
}

// ========== FUNCIÓN DE LOGIN ==========
// Esta función se ejecuta cuando el usuario hace clic en el botón de registrarse. Si el formulario tiene campos de nombre y email, se procesa como un registro. Si no, se procesa como un login.

// si el usuario ha superado el nunmero maximo de intentos este se bloquea y muestra el mensaje
    function procesarLogin() {
    if (bloqueado) {
        mostrarBloqueo();
        return;
    }

    // limpoia los resultados anteriores cada vez que se intenta iniciar sesión, para mostrar solo el mensaje actual
    areaResultados.innerHTML = '';
    // Obtener valores de los elementos del DOM y eliminar espacios con trim
    const usuario = inputUsuario.value.trim();
    const password = inputPassword.value.trim();

    // Validar que no estén vacíos
    if (!usuario || !password) {
        mostrarError('Por favor, ingresa usuario y contraseña');
        return;
    }

    // Validar credenciales busca en la BD si hay usuarios registrados. Si encuentra un usuario con el mismo nombre y contraseña, devuelve ese usuario. 
    const usuarioValido = validarCredenciales(usuario, password);

    if (usuarioValido) {
        mostrarBienvenida(usuarioValido.nombre);
        limpiarFormulario();
        intentos = 0;
    } else {
        intentos++;

        if (intentos < maxIntentos) {
            mostrarIntento(intentos, maxIntentos);
        } else {
            bloqueado = true;
            mostrarBloqueo();
        }
    }
}

// ========== FUNCIONES DE MOSTRAR RESULTADOS ==========
// estas funciones se encargan de mostrar mensajes de error, éxito, bienvenida, advertencia y bloqueo en el área de resultados.

function mostrarError(mensaje) {
    // muestra erroe en el área de resultados y también lo imprime en la consola como error
    const div = document.createElement('div'); /* crea el elemento div */
    div.className = 'resultado error'; /* asigna la clase de estilo */
    div.textContent = `❌ ${mensaje}`; /* agrega el texto al mensaje */
    areaResultados.appendChild(div); /* agrega el elemento al área de resultados */
    console.error(mensaje); /* imprime el error en la consola */
}

function mostrarExito(nombre, usuario, email) {
    const div = document.createElement('div');
    div.className = 'resultado exito';
    /* el innerHTML permite meter codigo html */
    div.innerHTML = `
    <h3>✅ ¡Registro exitoso!</h3>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Usuario:</strong> ${usuario}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p style="color: green; margin-top: 10px;">Puedes iniciar sesión con tu usuario y contraseña</p>
  `;
    areaResultados.appendChild(div);
    console.log(`✅ Usuario ${usuario} registrado exitosamente`);
}

function mostrarBienvenida(nombre) {
    const div = document.createElement('div');
    div.className = 'resultado bienvenida';
    div.innerHTML = `
    <h2>🎉 ¡Bienvenido al sistema!</h2>
    <p>Hola <strong>${nombre}</strong>, tu sesión ha sido iniciada correctamente.</p>
    <p style="color: green; margin-top: 10px;">Acceso garantizado al sistema Aguas Paraíso</p>
  `;
    areaResultados.appendChild(div);
    console.log(`¡Bienvenido al sistema, ${nombre}!`);
}

function mostrarIntento(intento, max) {
    const div = document.createElement('div');
    div.className = 'resultado advertencia';
    div.innerHTML = `
    <p>⚠️ Datos incorrectos. Intento ${intento} de ${max}.</p>
    <p style="color: orange;">Te quedan ${max - intento} intento(s)</p>
  `;
    areaResultados.appendChild(div);
    console.warn(`Intento ${intento} de ${max} - Credenciales incorrectas`);
}

function mostrarBloqueo() {
    const div = document.createElement('div');
    div.className = 'resultado bloqueado';
    div.innerHTML = `
    <h3>🔒 Usuario bloqueado</h3>
    <p>Ha superado el número máximo de intentos (${maxIntentos}).</p>
    <p style="color: red; margin-top: 10px;">Por seguridad, tu cuenta ha sido bloqueada.</p>
    <button id="btnDesbloquear" style="margin-top: 10px; padding: 8px 15px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Desbloquear
    </button>
  `;
    areaResultados.appendChild(div);
    console.error('Usuario bloqueado. Ha superado el número de intentos.');

    // Evento para desbloquear
    document.getElementById('btnDesbloquear').addEventListener('click', () => {
        bloqueado = false;
        intentos = 0;
        limpiarFormulario();
        areaResultados.innerHTML = '';
        console.log('Cuenta desbloqueada. Puedes intentar nuevamente');
    });
}

function limpiarFormulario() {
    registroForm.reset(); /* limpia el formulario */
    inputNombre.focus(); /* pone el foco en el campo de nombre para facilitar el registro o login */
}

// ========== EVENTO DEL BOTÓN ==========
btnRegistrarse.addEventListener('click', () => {
    // Verificar si es un registro o login
    if (inputNombre.value.trim() && inputEmail.value.trim()) {
        // Si hay nombre y email, es un registro
        procesarRegistro();
    } else {
        // Si no, es un login
        procesarLogin();
    }
});

// ========== EVENTO PARA TECLA ENTER ==========
registroForm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        btnRegistrarse.click();
    }
});

// ========== EVENTOS DE VALIDACIÓN EN TIEMPO REAL ==========
inputNombre.addEventListener('input', (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 3) {
        console.log('El nombre debe tener al menos 3 caracteres');
    }
});

inputEmail.addEventListener('change', (e) => {
    if (e.target.value.trim() && !validarEmail(e.target.value.trim())) {
        console.warn('Email inválido');
    }
});

inputPassword.addEventListener('input', (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 6) {
        console.log('La contraseña debe tener al menos 6 caracteres');
    }
});

// ========== MENSAJE INICIAL ==========
window.addEventListener('load', () => {
    const bienvenida = document.createElement('div');
    bienvenida.className = 'resultado bienvenida-inicial';
    bienvenida.innerHTML = `
    <h2>👋 Bienvenido a Aguas Paraíso</h2>
    <p>Completa el formulario para registrarte o ingresa tus credenciales para iniciar sesión</p>
    <p style="font-size: 12px; color: #666; margin-top: 10px;">Usuarios de prueba: jhordan/123456, admin/admin123</p>
  `;
    areaResultados.appendChild(bienvenida);
    console.log('✅ Script de registro cargado correctamente');
});