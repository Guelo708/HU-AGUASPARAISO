const API_URL ="https://6a190f75489e471575196864.mockapi.io/api/v1/Facturas";

//variables para el DOM sirven para obtener los elementos del formulario y la tabla
const idFactura = document.getElementById("idFactura");
const fecha = document.getElementById("fecha");
const valorTotal = document.getElementById("valorTotal");
const estado = document.getElementById("estado");

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");

const tablaFacturas = document.getElementById("tablaFacturas");


// LISTAR FACTURAS

async function obtenerFacturas() {

    try {
        const response = await fetch(API_URL);
        const facturas = await response.json();

        tablaFacturas.innerHTML = "";

        facturas.forEach(factura => {

            tablaFacturas.innerHTML += `
        <tr>
            <td>${factura.id || ""}</td>
            <td>${factura.fecha || ""}</td>
            <td>$ ${factura.valorTotal || 0}</td>
            <td>${factura.estado || ""}</td>
            <td>
                <button
                class="seleccionar"
                onclick="seleccionarFactura(
                    '${factura.id}',
                    '${factura.fecha}',
                    '${factura.valorTotal}',
                    '${factura.estado}'
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

// GUARDAR FACTURA

btnGuardar.addEventListener("click", async () => {

    if (!fecha.value || !valorTotal.value || !estado.value) {
        alert("Complete todos los campos");
        return;
    }

    const nuevaFactura = {
        fecha: fecha.value,
        valorTotal: Number(valorTotal.value),
        estado: estado.value
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaFactura)
        });

        const data = await response.json();

        console.log("Factura creada:", data);

        limpiarFormulario();
        await obtenerFacturas();

        alert("Factura guardada correctamente");

    } catch (error) {
        console.error(error);
    }

});

// SELECCIONAR FACTURA

function seleccionarFactura(id, fechaFactura, valor, estadoFactura) {

    idFactura.value = id;
    fecha.value = fechaFactura;
    valorTotal.value = valor;
    estado.value = estadoFactura;
}

// ACTUALIZAR FACTURA

btnActualizar.addEventListener("click", async () => {

    const id = idFactura.value;

    if (!id) {
        alert("Seleccione una factura");
        return;
    }

    const facturaActualizada = {
        fecha: fecha.value,
        valorTotal: valorTotal.value,
        estado: estado.value
    };

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(facturaActualizada)
        });

        limpiarFormulario();
        obtenerFacturas();

        alert("Factura actualizada");

    } catch (error) {
        console.error(error);
    }

});

// ELIMINAR FACTURA

btnEliminar.addEventListener("click", async () => {

    const id = idFactura.value;

    if (!id) {
        alert("Seleccione una factura");
        return;
    }

    const confirmar = confirm(
        "¿Desea eliminar esta factura?"
    );

    if (!confirmar) return;

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        limpiarFormulario();
        obtenerFacturas();

        alert("Factura eliminada");

    } catch (error) {
        console.error(error);
    }

});

// LIMPIAR FORMULARIO

function limpiarFormulario() {

    idFactura.value = "";
    fecha.value = "";
    valorTotal.value = "";
    estado.value = "";
}

// INICIO

obtenerFacturas();