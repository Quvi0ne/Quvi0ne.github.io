 // Vector de productos
 let productos = [
    { codigo: "LAC001", nombre: "Leche Entera", tipo: "Leche", precio: 1.20, stock: 150 },
    { codigo: "LAC002", nombre: "Queso Fresco", tipo: "Queso", precio: 3.50, stock: 80 },
    { codigo: "LAC003", nombre: "Yogurt Natural", tipo: "Yogurt", precio: 0.90, stock: 120 },
    { codigo: "LAC004", nombre: "Mantequilla", tipo: "Derivado", precio: 2.10, stock: 60 },
    { codigo: "LAC005", nombre: "Leche Deslactosada", tipo: "Leche", precio: 1.40, stock: 90 }
];

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarListaProductos();
});

function agregarProducto() {
    const codigo = document.getElementById('producto-codigo').value.trim();
    const nombre = document.getElementById('producto-nombre').value.trim();
    const tipo = document.getElementById('producto-tipo').value.trim();
    const precio = parseFloat(document.getElementById('producto-precio').value);
    const stock = parseInt(document.getElementById('producto-stock').value);
    const mensaje = document.getElementById('producto-mensaje');

    // Validar que el código no esté vacío y no se repita
    if (!codigo) {
        mensaje.textContent = "El código del producto es obligatorio";
        mensaje.style.color = "red";
        return;
    }

    const existe = productos.some(p => p.codigo === codigo);
    if (existe) {
        mensaje.textContent = "Ya existe un producto con ese código";
        mensaje.style.color = "red";
        return;
    }

    // Validar nombre
    if (!nombre) {
        mensaje.textContent = "El nombre del producto es obligatorio";
        mensaje.style.color = "red";
        return;
    }

    // Crear nuevo producto
    const nuevoProducto = {
        codigo: codigo,
        nombre: nombre,
        tipo: tipo || "Sin especificar",
        precio: precio || 0,
        stock: stock || 0
    };

    productos.push(nuevoProducto);
    actualizarListaProductos();

    // Limpiar formulario
    document.getElementById('producto-codigo').value = '';
    document.getElementById('producto-nombre').value = '';
    document.getElementById('producto-tipo').value = '';
    document.getElementById('producto-precio').value = '';
    document.getElementById('producto-stock').value = '';

    mensaje.textContent = "Producto agregado correctamente";
    mensaje.style.color = "green";
}

function buscarProducto() {
    const busqueda = document.getElementById('buscar-producto').value.trim().toLowerCase();
    const resultado = document.getElementById('resultado-busqueda-producto');

    if (!busqueda) {
        resultado.innerHTML = "<p>Ingrese un término de búsqueda</p>";
        return;
    }

    const encontrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) || 
        p.codigo.toLowerCase().includes(busqueda))
        .map(p => 
            `<div class="item-encontrado">
                <p><strong>Código:</strong> ${p.codigo}</p>
                <p><strong>Nombre:</strong> ${p.nombre}</p>
                <p><strong>Tipo:</strong> ${p.tipo}</p>
                <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
                <p><strong>Stock:</strong> ${p.stock}</p>
            </div>`
        );

    if (encontrados.length > 0) {
        resultado.innerHTML = encontrados.join('');
    } else {
        resultado.innerHTML = "<p>No se encontraron productos</p>";
    }
}

function eliminarProducto() {
    const codigo = document.getElementById('eliminar-producto').value.trim();
    const mensaje = document.getElementById('eliminar-mensaje-producto');

    if (!codigo) {
        mensaje.textContent = "Ingrese el código del producto a eliminar";
        mensaje.style.color = "red";
        return;
    }

    const indice = productos.findIndex(p => p.codigo === codigo);

    if (indice === -1) {
        mensaje.textContent = "No se encontró un producto con ese código";
        mensaje.style.color = "red";
        return;
    }

    productos.splice(indice, 1);
    actualizarListaProductos();

    document.getElementById('eliminar-producto').value = '';
    mensaje.textContent = "Producto eliminado correctamente";
    mensaje.style.color = "green";
}

function actualizarListaProductos() {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = productos.map(p => 
        `<div class="item">
            <p><strong>Código:</strong> ${p.codigo}</p>
            <p><strong>Nombre:</strong> ${p.nombre}</p>
            <p><strong>Tipo:</strong> ${p.tipo}</p>
            <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
            <p><strong>Stock:</strong> ${p.stock}</p>
        </div>`
    ).join('');
}