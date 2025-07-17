   // Vector de tiendas
   let tiendas = [
    { id: "TIE001", nombre: "Tienda Central", direccion: "Av. Principal 123", telefono: "555-1001", horario: "8:00 - 20:00" },
    { id: "TIE002", nombre: "Tienda Norte", direccion: "Calle Norte 456", telefono: "555-1002", horario: "9:00 - 19:00" },
    { id: "TIE003", nombre: "Tienda Sur", direccion: "Boulevard Sur 789", telefono: "555-1003", horario: "8:30 - 19:30" },
    { id: "TIE004", nombre: "Tienda Este", direccion: "Calle Este 101", telefono: "555-1004", horario: "9:00 - 18:00" },
    { id: "TIE005", nombre: "Tienda Oeste", direccion: "Av. Oeste 202", telefono: "555-1005", horario: "8:00 - 19:00" }
];

// Mostrar tiendas al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarListaTiendas();
});

function agregarTienda() {
    const id = document.getElementById('tienda-id').value.trim();
    const nombre = document.getElementById('tienda-nombre').value.trim();
    const direccion = document.getElementById('tienda-direccion').value.trim();
    const telefono = document.getElementById('tienda-telefono').value.trim();
    const horario = document.getElementById('tienda-horario').value.trim();
    const mensaje = document.getElementById('tienda-mensaje');

    // Validar que el ID no esté vacío y no se repita
    if (!id) {
        mensaje.textContent = "El ID de la tienda es obligatorio";
        mensaje.style.color = "red";
        return;
    }

    const existe = tiendas.some(t => t.id === id);
    if (existe) {
        mensaje.textContent = "Ya existe una tienda con ese ID";
        mensaje.style.color = "red";
        return;
    }

    // Validar nombre
    if (!nombre) {
        mensaje.textContent = "El nombre de la tienda es obligatorio";
        mensaje.style.color = "red";
        return;
    }

    // Crear nueva tienda
    const nuevaTienda = {
        id: id,
        nombre: nombre,
        direccion: direccion || "Sin especificar",
        telefono: telefono || "Sin teléfono",
        horario: horario || "Sin horario definido"
    };

    tiendas.push(nuevaTienda);
    actualizarListaTiendas();

    // Limpiar formulario
    document.getElementById('tienda-id').value = '';
    document.getElementById('tienda-nombre').value = '';
    document.getElementById('tienda-direccion').value = '';
    document.getElementById('tienda-telefono').value = '';
    document.getElementById('tienda-horario').value = '';

    mensaje.textContent = "Tienda agregada correctamente";
    mensaje.style.color = "green";
}

function buscarTienda() {
    const busqueda = document.getElementById('buscar-tienda').value.trim().toLowerCase();
    const resultado = document.getElementById('resultado-busqueda-tienda');

    if (!busqueda) {
        resultado.innerHTML = "<p>Ingrese un término de búsqueda</p>";
        return;
    }

    const encontradas = tiendas.filter(t => 
        t.nombre.toLowerCase().includes(busqueda) || 
        t.id.toLowerCase().includes(busqueda))
        .map(t => 
            `<div class="item-encontrado">
                <p><strong>ID:</strong> ${t.id}</p>
                <p><strong>Nombre:</strong> ${t.nombre}</p>
                <p><strong>Dirección:</strong> ${t.direccion}</p>
                <p><strong>Teléfono:</strong> ${t.telefono}</p>
                <p><strong>Horario:</strong> ${t.horario}</p>
            </div>`
        );

    if (encontradas.length > 0) {
        resultado.innerHTML = encontradas.join('');
    } else {
        resultado.innerHTML = "<p>No se encontraron tiendas</p>";
    }
}

function eliminarTienda() {
    const id = document.getElementById('eliminar-tienda').value.trim();
    const mensaje = document.getElementById('eliminar-mensaje-tienda');

    if (!id) {
        mensaje.textContent = "Ingrese el ID de la tienda a eliminar";
        mensaje.style.color = "red";
        return;
    }

    const indice = tiendas.findIndex(t => t.id === id);

    if (indice === -1) {
        mensaje.textContent = "No se encontró una tienda con ese ID";
        mensaje.style.color = "red";
        return;
    }

    tiendas.splice(indice, 1);
    actualizarListaTiendas();

    document.getElementById('eliminar-tienda').value = '';
    mensaje.textContent = "Tienda eliminada correctamente";
    mensaje.style.color = "green";
}

function actualizarListaTiendas() {
    const lista = document.getElementById('lista-tiendas');
    lista.innerHTML = tiendas.map(t => 
        `<div class="item">
            <p><strong>ID:</strong> ${t.id}</p>
            <p><strong>Nombre:</strong> ${t.nombre}</p>
            <p><strong>Dirección:</strong> ${t.direccion}</p>
            <p><strong>Teléfono:</strong> ${t.telefono}</p>
            <p><strong>Horario:</strong> ${t.horario}</p>
        </div>`
    ).join('');
}