// segunda preentrega tienda de ropa javascript arrays constructores, clases, funciones.

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
    }

    asignarCantidad(cantidad) {
        this.cantidad = parseInt(cantidad);
    }


    calcularSubtotal() {
        return this.precio * this.cantidad;
    }
}


class Tienda {
    constructor(productos) {
        this.productos = productos;
    }


    recolectarCantidad() {
        this.productos.forEach(producto => {
            let cantidad = prompt("Cuantas " + producto.nombre + " deseas comprar");
            producto.asignarCantidad(cantidad);
        });
    }


    calcularTotalCompra() {
        return this.productos.reduce((total, producto) => {
            return total + producto.calcularSubtotal();
        }, 0);
    }


    mostrarTotal() {
        let totalCompra = this.calcularTotalCompra();
        console.log("El total de tu compra es: $" + totalCompra);
    }


    listarProductos() {
        this.productos.forEach(function(producto) {
            console.log('Producto: ' + producto.nombre + ', Precio: ' + producto.precio);
        });
    }
}


let productos = [
    new Producto("camisas", 50),
    new Producto("pantalones", 80),
    new Producto("abrigos", 120)
];

let miTienda = new Tienda(productos);

miTienda.listarProductos(); 
miTienda.recolectarCantidad(); 
miTienda.mostrarTotal(); 