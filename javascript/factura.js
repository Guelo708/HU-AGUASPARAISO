const url = "https://6a190f75489e471575196864.mockapi.io/api/v1/Facturas";

const cardsContainer = document.querySelector("#cards");
const btnGenerar = document.querySelector("#btnGenerar");


const botonLimpiarTodo = document.querySelector('#btn-limpiar-todo')
const botonCargar = document.querySelector('#btn-cargar')


const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2
});

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short"
});

// Obtener datos de MockAPI
async function getData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}

// Crear tarjeta
function crearTarjeta(item) {

  const card = document.createElement("article");
  card.className = "card";

  const fecha = document.createElement("span");
  fecha.className = "badge";
  fecha.textContent = formatoFecha.format(
    new Date(item.fechaEmision)
  );

  const valor = document.createElement("h2");
  valor.className = "valor";
  valor.textContent = formatoCOP.format(
    parseFloat(item.valorTotal)
  );

  const estado = document.createElement("p");
  estado.className = "estado";

  estado.textContent = item.estado;

  const id = document.createElement("p");
  id.className = "fecha";
  id.textContent = `Factura #${item.id}`;

  card.append(
    fecha,
    valor,
    estado,
    id
  );

  return card;
}

// Pintar tarjetas
async function pintarTarjetas() {

  cardsContainer.innerHTML =
    "<p class='estado'>Cargando facturas...</p>";

  const data = await getData();

  if (!data.length) {
    cardsContainer.innerHTML =
      "<p class='estado'>No hay facturas disponibles.</p>";
    return;
  }

  cardsContainer.innerHTML = "";

  data.forEach(item => {
    cardsContainer.appendChild(
      crearTarjeta(item)
    );
  });
}

// Evento del botón
btnGenerar.addEventListener("click", pintarTarjetas);