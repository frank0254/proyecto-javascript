// simulador de compra para tienda de ropa proyecto final 
let precioCamisas = 50;
let precioPantalones = 80;
let precioAbrigos = 120;

function calcularSubtotal(producto, cantidad) {
    let precio;
    if (producto === "camisas") {
        precio = precioCamisas;
    } else if (producto === "pantalones") {
        precio = precioPantalones;
    } else if (producto === "abrigos") {
        precio = precioAbrigos;
    }
    return precio * cantidad;
}

let totalCompra = 0;

let productos = ["camisas", "pantalones", "abrigos"];
let precios = [precioCamisas, precioPantalones, precioAbrigos];

for (let i = 0; i < 3; i++) {
    let producto;
    if (i === 0) {
        producto = "camisas";
    } else if (i === 1) {
        producto = "pantalones";
    } else if (i === 2) {
        producto = "abrigos";
    }

    let cantidad = parseInt(prompt("Cuantas"  + producto + "deseas comprar"));
    totalCompra += calcularSubtotal(producto, cantidad);
}


console.log("El total de tu compra es: $" + totalCompra);

