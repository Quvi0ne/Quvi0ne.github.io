
        let empleados = [
            { id: "EMP001", nombre: "Juan Pérez", puesto: "Vendedor", tienda: "TIE001", email: "juan@lacteos.com" },
            { id: "EMP002", nombre: "María García", puesto: "Gerente", tienda: "TIE002", email: "maria@lacteos.com" },
            { id: "EMP003", nombre: "Carlos López", puesto: "Repartidor", tienda: "TIE001", email: "carlos@lacteos.com" },
            { id: "EMP004", nombre: "Ana Martínez", puesto: "Cajera", tienda: "TIE003", email: "ana@lacteos.com" },
            { id: "EMP005", nombre: "Luis Rodríguez", puesto: "Almacenista", tienda: "TIE002", email: "luis@lacteos.com" }
        ];

        // Mostrar empleados al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            actualizarListaEmpleados();
        });

        function agregarEmpleado() {
            const id = document.getElementById('empleado-id').value.trim();
            const nombre = document.getElementById('empleado-nombre').value.trim();
            const puesto = document.getElementById('empleado-puesto').value.trim();
            const tienda = document.getElementById('empleado-tienda').value.trim();
            const email = document.getElementById('empleado-email').value.trim();
            const mensaje = document.getElementById('empleado-mensaje');

            // Validar que el ID no esté vacío y no se repita
            if (!id) {
                mensaje.textContent = "El ID del empleado es obligatorio";
                mensaje.style.color = "red";
                return;
            }

            const existe = empleados.some(e => e.id === id);
            if (existe) {
                mensaje.textContent = "Ya existe un empleado con ese ID";
                mensaje.style.color = "red";
                return;
            }

            // Validar nombre
            if (!nombre) {
                mensaje.textContent = "El nombre del empleado es obligatorio";
                mensaje.style.color = "red";
                return;
            }

            // Crear nuevo empleado
            const nuevoEmpleado = {
                id: id,
                nombre: nombre,
                puesto: puesto || "Sin especificar",
                tienda: tienda || "Sin asignar",
                email: email || "Sin correo"
            };

            empleados.push(nuevoEmpleado);
            actualizarListaEmpleados();

            // Limpiar formulario
            document.getElementById('empleado-id').value = '';
            document.getElementById('empleado-nombre').value = '';
            document.getElementById('empleado-puesto').value = '';
            document.getElementById('empleado-tienda').value = '';
            document.getElementById('empleado-email').value = '';

            mensaje.textContent = "Empleado agregado correctamente";
            mensaje.style.color = "green";
        }

        function buscarEmpleado() {
            const busqueda = document.getElementById('buscar-empleado').value.trim().toLowerCase();
            const resultado = document.getElementById('resultado-busqueda-empleado');

            if (!busqueda) {
                resultado.innerHTML = "<p>Ingrese un término de búsqueda</p>";
                return;
            }

            const encontrados = empleados.filter(e => 
                e.nombre.toLowerCase().includes(busqueda) || 
                e.id.toLowerCase().includes(busqueda))
                .map(e => 
                    `<div class="item-encontrado">
                        <p><strong>ID:</strong> ${e.id}</p>
                        <p><strong>Nombre:</strong> ${e.nombre}</p>
                        <p><strong>Puesto:</strong> ${e.puesto}</p>
                        <p><strong>Tienda:</strong> ${e.tienda}</p>
                        <p><strong>Email:</strong> ${e.email}</p>
                    </div>`
                );

            if (encontrados.length > 0) {
                resultado.innerHTML = encontrados.join('');
            } else {
                resultado.innerHTML = "<p>No se encontraron empleados</p>";
            }
        }

        function eliminarEmpleado() {
            const id = document.getElementById('eliminar-empleado').value.trim();
            const mensaje = document.getElementById('eliminar-mensaje-empleado');

            if (!id) {
                mensaje.textContent = "Ingrese el ID del empleado a eliminar";
                mensaje.style.color = "red";
                return;
            }

            const indice = empleados.findIndex(e => e.id === id);

            if (indice === -1) {
                mensaje.textContent = "No se encontró un empleado con ese ID";
                mensaje.style.color = "red";
                return;
            }

            empleados.splice(indice, 1);
            actualizarListaEmpleados();

            document.getElementById('eliminar-empleado').value = '';
            mensaje.textContent = "Empleado eliminado correctamente";
            mensaje.style.color = "green";
        }

        function actualizarListaEmpleados() {
            const lista = document.getElementById('lista-empleados');
            lista.innerHTML = empleados.map(e => 
                `<div class="item">
                    <p><strong>ID:</strong> ${e.id}</p>
                    <p><strong>Nombre:</strong> ${e.nombre}</p>
                    <p><strong>Puesto:</strong> ${e.puesto}</p>
                    <p><strong>Tienda:</strong> ${e.tienda}</p>
                    <p><strong>Email:</strong> ${e.email}</p>
                </div>`
            ).join('');
        }
