async function cargarPagos() {
  const resultado = document.getElementById("resultadoPagos");
  resultado.innerHTML = "Cargando...";

  const apiPagos = "https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/pagos";
  const apiFacturas = "https://6a190f75489e471575196864.mockapi.io/api/v1/Facturas";
  const apiUsuarios = "https://6a13aada6c7db8aac0534233.mockapi.io/api/v1/usuarios";

  try {
    const respPagos = await fetch(apiPagos);
    const pagos = await respPagos.json();
    resultado.innerHTML = "";

    for (const pago of pagos) {
      // Traer usuario
      let usuario;
      try {
        const respUsuario = await fetch(`${apiUsuarios}/${pago.idUsuario}`);
        usuario = await respUsuario.json();
      } catch {
        usuario = { nombre: "Usuario no registrado", avatar: "" };
      }

      // Traer factura
      let factura;
      try {
        const respFactura = await fetch(`${apiFacturas}/${pago.idFactura}`);
        factura = await respFactura.json();
      } catch {
        factura = null;
      }

      // Valores seguros
      const facturaId = factura?.id || pago.idFactura || "N/A";
      const total = parseFloat(factura?.valorTotal || 0);

      // Ignorar facturas en cero
      if (total === 0) {
        continue; // no renderizar tarjeta
      }

      let valorPagado = parseFloat(pago.valorPagado || 0);

      // Ajustar pagos superiores al total
      if (valorPagado > total) {
        valorPagado = total;
      }

      // Validación de estado consistente
      let facturaEstado;
      const totalFixed = Number(total.toFixed(2));
      const pagadoFixed = Number(valorPagado.toFixed(2));

      if (pagadoFixed === totalFixed && totalFixed > 0) {
        facturaEstado = "Pagada";
      } else if (pagadoFixed > 0 && pagadoFixed < totalFixed) {
        facturaEstado = "Parcialmente Pagada";
      } else {
        facturaEstado = "Pendiente";
      }

      // Crear tarjeta
      const card = document.createElement("div");
      card.classList.add("card");

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      // Frente: usuario
      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const avatar = document.createElement("img");
      avatar.src = usuario.avatar || "https://via.placeholder.com/80?text=Foto";
      avatar.alt = "Foto usuario";

      const nombre = document.createElement("h3");
      nombre.textContent = usuario.nombre || "Usuario no registrado";

      cardFront.appendChild(avatar);
      cardFront.appendChild(nombre);

      // Reverso: factura + pago
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");

      cardBack.innerHTML = `
        <p><span class="label">Factura:</span> <span class="valor">#${facturaId} - $${totalFixed.toFixed(2)}</span></p>
        <p><span class="label">Estado:</span> <span class="valor">${facturaEstado}</span></p>
        <p><span class="label">Fecha pago:</span> <span class="valor">${new Date(pago.fechaPago).toLocaleDateString()}</span></p>
        <p><span class="label">Valor pagado:</span> <span class="valor">$${pagadoFixed.toFixed(2)}</span></p>
        <p><span class="label">Método:</span> <span class="valor">${normalizarMetodo(pago.metodoPago)}</span></p>
      `;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);

      // Evento de clic para girar
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });

      resultado.appendChild(card);
    }
  } catch (error) {
    resultado.innerHTML = "No se pudieron cargar los pagos. Intenta más tarde.";
    console.error(error);
  }
}

// Normalización de métodos de pago
function normalizarMetodo(metodo) {
  const opciones = ["Efectivo", "Consignacion", "Transferencia"];
  return opciones.includes(metodo) ? metodo : opciones[Math.floor(Math.random() * opciones.length)];
}

document.getElementById("btnCargarPagos").addEventListener("click", cargarPagos);




