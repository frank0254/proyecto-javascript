
// Navegación navbar
const header = document.querySelector('#header');
const navegacion = document.createElement('div');
const nav = document.createElement('nav');
const ul = document.createElement('ul');

const enlaces = [
    { link: "index.html", nombre: "Inicio" },
    { link: "productos.html", nombre: "Productos" },
    { link: "contacto.html", nombre: "Contacto" }
];

// Añadir elementos al DOM
header.appendChild(navegacion);
navegacion.appendChild(nav);
nav.appendChild(ul);

// enlaces y añadirlos al ul
enlaces.forEach(enlace => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.href = enlace.link;
    a.textContent = enlace.nombre;
    
    li.appendChild(a);
    ul.appendChild(li);
});


document.addEventListener('DOMContentLoaded', () => {
    
    const botonMostrarMensaje = document.getElementById('mostrarMensaje');
    const mensajeContenedor = document.getElementById('mensajeBienvenida');

  
    botonMostrarMensaje.addEventListener('click', () => {
        mensajeContenedor.innerText = '¡Gracias por visitar nuestra tienda! Estamos aquí para ayudarte.';
    });
});

