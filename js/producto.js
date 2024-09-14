document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
    mostrarCarrito();
});

// Obtener productos del archivo JSON
const obtenerProductos = async () => {
    try {
        const respuesta = await fetch('../productos.json');
        const productos = await respuesta.json();

        const cardsProd = document.getElementById('productos');
        cardsProd.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas
        const selectProducto = document.getElementById('selectProducto');
        selectProducto.innerHTML = ''; // Limpiar el menú desplegable antes de agregar opciones

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('col-md-3');
            card.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img class="card-img-top" src="${producto.image}" alt="${producto.title}" />
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">Descripción: ${producto.description}</p>
                        <p class="card-text">Precio: $${producto.price}.-</p>
                        <a href="#" class="btn btn-primary" onclick="agregarAlCarrito('${producto.id}', '${producto.title}', ${producto.price}); return false;">Agregar al Carrito</a>
                    </div>
                </div>
            `;
            cardsProd.appendChild(card);

            // Añadir opciones al menú desplegable para eliminar productos
            let option = document.createElement('option');
            option.value = producto.id;
            option.textContent = producto.title;
            selectProducto.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

// Agregar producto al carrito
const agregarAlCarrito = (id, nombre, precio) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ id, nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
};

// Mostrar carrito en la página
const mostrarCarrito = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let listaCarrito = document.getElementById('carrito');
    listaCarrito.innerHTML = '';
    let totalCarrito = 0;

    carrito.forEach(item => {
        let itemCarrito = document.createElement('li');
        itemCarrito.classList.add('list-group-item');
        itemCarrito.innerText = `Producto: ${item.nombre}, Precio: $${item.precio}`;
        listaCarrito.appendChild(itemCarrito);
        totalCarrito += item.precio;
    });

    // Cálculo del IVA 
    const IVA = 0.21;
    const totalConIVA = totalCarrito * (1 + IVA);

    document.getElementById('totalCarrito').innerText = `Total Carrito: $${totalCarrito.toFixed(2)} (IVA incluido: $${totalConIVA.toFixed(2)})`;
};

// Vaciar el carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    console.log('Vaciar carrito clickeado');
    localStorage.removeItem('carrito');
    mostrarCarrito();
});

// Eliminar un producto específico del carrito
const eliminarProducto = () => {
    let id = document.getElementById('selectProducto').value;
    if (id) {
        console.log('Eliminar producto clickeado, ID:', id);
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
};

// Vincular  botón de eliminar producto
document.getElementById('eliminarProducto').addEventListener('click', () => {
    eliminarProducto();
});

// Comprar carrito
document.getElementById('comprarCarrito').addEventListener('click', () => {
    Swal.fire({
        title: 'Compra realizada con éxito',
        text: '¡Gracias por tu compra!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Vaciar el carrito después de la compra
        localStorage.removeItem('carrito');
        mostrarCarrito();
    });
});
