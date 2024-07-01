document.addEventListener('DOMContentLoaded', function() {
    const libroForm = document.getElementById('libroForm');
    const librosTable = document.getElementById('librosTable').getElementsByTagName('tbody')[0];

    libroForm.addEventListener('submit', function(e) {
        
        e.preventDefault();

        const fecha_publicacion = document.getElementById('fecha_publicacion').value;
        const precio = document.getElementById('precio').value;
        const id_autor = document.getElementById('id_autor').value;

        // Aquí deberia estar llamando a mi servidor

        const newRow = librosTable.insertRow();
        newRow.innerHTML = `
            <td>${fecha_publicacion}</td>
            <td>${precio}</td>
            <td>${id_autor}</td>
            <td>
                <button class="view" onclick="viewLibro(this)">Leer</button>
                <button class="edit" onclick="editLibro(this)">Editar</button>
                <button class="delete" onclick="deleteLibro(this)">Eliminar</button>
            </td>
        `;

        libroForm.reset();
    });
});

function viewLibro(button) {
    const row = button.parentNode.parentNode;
    const fecha_publicacion = row.cells[0].innerText;
    const precio = row.cells[1].innerText;
    const id_autor = row.cells[2].innerText;
    alert(`Fecha de Publicación: ${fecha_publicacion}\nPrecio: ${precio}\nID del Autor: ${id_autor}`);
}

function editLibro(button) {
    const row = button.parentNode.parentNode;
    const fecha_publicacion = prompt("Editar Fecha de Publicación:", row.cells[0].innerText);
    const precio = prompt("Editar Precio:", row.cells[1].innerText);
    const id_autor = prompt("Editar ID del Autor:", row.cells[2].innerText);

    if (fecha_publicacion && precio && id_autor) {
        row.cells[0].innerText = fecha_publicacion;
        row.cells[1].innerText = precio;
        row.cells[2].innerText = id_autor;
    }
}

function deleteLibro(button) {
    if (confirm("¿Seguro que deseas eliminar este libro?")) {
        const row = button.parentNode.parentNode;
        row.remove();
    }
}
