document.addEventListener('DOMContentLoaded', function() {
    const autorForm = document.getElementById('autorForm');
    const autoresTable = document.getElementById('autoresTable').getElementsByTagName('tbody')[0];

    // Cargar autores al cargar la página
    fetch('http://localhost:4000/api/autores/leer')
        .then(response => response.json())
        .then(data => {
            data.forEach(autor => {
                const newRow = autoresTable.insertRow();
                newRow.innerHTML = `
                    <td>${autor.nombre}</td>
                    <td>${autor.apellido}</td>
                    <td>${autor.fecha_nacimiento}</td>
                    <td>
                        <button class="view" onclick="viewAutor(${autor.id})">Leer</button>
                        <button class="edit" onclick="editAutor(${autor.id})">Editar</button>
                        <button class="delete" onclick="deleteAutor(${autor.id})">Eliminar</button>
                    </td>
                `;
            });
        });

    autorForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;

        fetch('http://localhost:4000/api/autores/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, fecha_nacimiento })
        })
        .then(response => response.json())
        .then(autor => {
            
            const newRow = autoresTable.insertRow();
            newRow.innerHTML = `
                <td>${autor.nombre}</td>
                <td>${autor.apellido}</td>
                <td>${autor.fecha_nacimiento}</td>
                <td>
                    <button class="view" onclick="viewAutor(${autor.id})">Leer</button>
                    <button class="edit" onclick="editAutor(${autor.id})">Editar</button>
                    <button class="delete" onclick="deleteAutor(${autor.id})">Eliminar</button>
                </td>
            `;
        });

        autorForm.reset();
    });
});

//leer
function viewAutor(id) {
    fetch(`/autores/${id}`)
        .then(response => response.json())
        .then(autor => {
            alert(`Nombre: ${autor.nombre}\nApellido: ${autor.apellido}\nFecha de Nacimiento: ${autor.fecha_nacimiento}`);
        })
        .catch(err => console.error('Error al obtener autor:', err));
}

//editar
function editAutor(id) {
    const nombre = prompt("Editar Nombre:");
    const apellido = prompt("Editar Apellido:");
    const fecha_nacimiento = prompt("Editar Fecha de Nacimiento:");

    if (nombre && apellido && fecha_nacimiento) {
        fetch(`http://localhost:4000/api/autores/editar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, fecha_nacimiento })
        })
        .then(response => response.json())
        .then(autor => {
            // Actualizar la fila en la tabla
            const row = document.querySelector(`#autoresTable tr[data-id="${id}"]`);
            if (row) {
                row.innerHTML = `
                    <td>${autor.nombre}</td>
                    <td>${autor.apellido}</td>
                    <td>${autor.fecha_nacimiento}</td>
                    <td>
                        <button class="view" onclick="viewAutor(${autor.id})">Leer</button>
                        <button class="edit" onclick="editAutor(${autor.id})">Editar</button>
                        <button class="delete" onclick="deleteAutor(${autor.id})">Eliminar</button>
                    </td>
                `;
            }
        })
        .catch(err => console.error('Error al editar autor:', err));
    }
}

//eliminar
function deleteAutor(id) {
    if (confirm("¿Seguro que deseas eliminar este autor?")) {
        fetch(`http://localhost:4000/api/autores/delete/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Eliminar la fila de la tabla
            const row = document.querySelector(`#autoresTable tr[data-id="${id}"]`);
            if (row) {
                row.remove();
            }
        })
        .catch(err => console.error('Error al eliminar autor:', err));
    }
}
