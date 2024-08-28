class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
    }

    asignarCantidad(cantidad) {
        this.cantidad = parseInt(cantidad, 10);
    }

    calcularSubtotal() {
        return this.precio * this.cantidad;
    }
}

class Tienda {
    constructor(productos) {
        this.productos = productos;
        this.init();
    }

    init() {
        this.listarProductos();
        this.setupEventListeners();
        this.cargarDatos();
        this.mostrarCarrito();
    }

    listarProductos() {
        let lista = document.getElementById('productos');
        lista.innerHTML = '';
        let inputs = document.getElementById('inputs');
        inputs.innerHTML = '';

        let selectProducto = document.getElementById('selectProducto');
        selectProducto.innerHTML = '';

        this.productos.forEach((producto, index) => {
            let item = document.createElement('li');
            item.innerText = `Producto: ${producto.nombre}, Precio: $${producto.precio}`;
            lista.appendChild(item);

            let inputLabel = document.createElement('label');
            inputLabel.innerText = `Cantidad de ${producto.nombre}: `;
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `input-${index}`;
            input.value = localStorage.getItem(`cantidad-${index}`) || 0;
            inputs.appendChild(inputLabel);
            inputs.appendChild(input);
            inputs.appendChild(document.createElement('br'));

            // Añadir opciones al menú desplegable para eliminar productos
            let option = document.createElement('option');
            option.value = producto.nombre;
            option.textContent = producto.nombre;
            selectProducto.appendChild(option);
        });
    }

    setupEventListeners() {
        document.getElementById('calcularTotal').addEventListener('click', () => {
            this.recolectarCantidad();
            this.mostrarTotal();
            this.agregarAlCarrito();
        });

        document.getElementById('vaciarCarrito').addEventListener('click', () => {
            this.vaciarCarrito();
        });

        document.getElementById('eliminarProducto').addEventListener('click', () => {
            this.eliminarProducto();
        });
    }

    recolectarCantidad() {
        this.productos.forEach((producto, index) => {
            let input = document.getElementById(`input-${index}`);
            if (input) {
                let cantidad = parseInt(input.value, 10);
                producto.asignarCantidad(cantidad);
                localStorage.setItem(`cantidad-${index}`, cantidad);
            }
        });
    }

    calcularTotalCompra() {
        return this.productos.reduce((total, producto) => {
            return total + producto.calcularSubtotal();
        }, 0);
    }

    mostrarTotal() {
        let totalCompra = this.calcularTotalCompra();
        document.getElementById('resultado').innerText = `El total de tu compra es: $${totalCompra}`;
        localStorage.setItem('totalCompra', totalCompra);
    }

    agregarAlCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.productos.forEach((producto) => {
            if (producto.cantidad > 0) {
                carrito.push({
                    nombre: producto.nombre,
                    cantidad: producto.cantidad,
                    precio: producto.precio,
                    subtotal: producto.calcularSubtotal()
                });
            }
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        sessionStorage.setItem('carrito', JSON.stringify(carrito)); 
        this.mostrarCarrito();
    }

    mostrarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let listaCarrito = document.getElementById('carrito');
        listaCarrito.innerHTML = '';
        let totalCarrito = 0;

        carrito.forEach(item => {
            let itemCarrito = document.createElement('li');
            itemCarrito.innerText = `Producto: ${item.nombre}, Cantidad: ${item.cantidad}, Subtotal: $${item.subtotal}`;
            listaCarrito.appendChild(itemCarrito);
            totalCarrito += item.subtotal;
        });

        document.getElementById('totalCarrito').innerText = `Total Carrito: $${totalCarrito}`;
    }

    cargarDatos() {
        this.productos.forEach((_, index) => {
            let cantidad = localStorage.getItem(`cantidad-${index}`) || 0;
            let input = document.getElementById(`input-${index}`);
            if (input) {
                input.value = cantidad;
            }
        });
        let totalCompra = localStorage.getItem('totalCompra') || 0;
        document.getElementById('resultado').innerText = `El total de tu compra es: $${totalCompra}`;
    }

    vaciarCarrito() {
        localStorage.removeItem('carrito');
        sessionStorage.removeItem('carrito');
        this.productos.forEach(producto => {
            producto.cantidad = 0;
        });
        this.listarProductos();
        this.mostrarTotal();
        this.mostrarCarrito();
    }

    eliminarProducto() {
        let nombre = document.getElementById('selectProducto').value;
        if (nombre) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
            
            const index = carrito.findIndex(item => item.nombre === nombre);
            if (index !== -1) {
                carrito.splice(index, 1); 
                localStorage.setItem('carrito', JSON.stringify(carrito));
                sessionStorage.setItem('carrito', JSON.stringify(carrito));
                
                
                this.productos.forEach(producto => {
                    if (producto.nombre === nombre) {
                        producto.cantidad = 0;
                    }
                });

                
                this.listarProductos();
                this.mostrarTotal();
                this.mostrarCarrito();
            }
        }
    }
}

// Crear productos
let productos = [
    new Producto("camisas", 50),
    new Producto("pantalones", 80),
    new Producto("abrigos", 120)
];

// Inicializar la tienda
let miTienda = new Tienda(productos);