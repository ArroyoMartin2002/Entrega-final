class Producto{
    constructor(id, nombre, precio, cantidad){
        this.id=id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const producto1 = new Producto (1, "THIS PLACE WILL BECOME YOUR TOMB / CD",3500, 1);
const producto2 = new Producto (2, "ONE EP EMBROIDERED TEE",7500, 1);
const producto3 = new Producto (3, "ONE EP BLACK HOODIE",13500, 1);
const producto4 = new Producto (4, "THE OFFERING STICKER",3000, 1);

const productos = [producto1, producto2, producto3, producto4];

const contenedorProductos = document.getElementById("contenedorProductos");

//creo la card del catalogo
productos.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("card","col-xl-3", "col-md-6", "col-sm-12");
    divProducto.innerHTML = `
                            <div>
                                <img src="img/${producto.id}.png" class="img-fluid ">
                                <div class="card-body">
                                    <h2 class="card-title"> ${producto.nombre}</h2>
                                    <p class="card-text"> $${producto.precio} </p>
                                    <button id="boton${producto.id}" class="btn btn-dark"> Add To Cart </button>
                                </div>
                            </div>`;
    contenedorProductos.appendChild(divProducto);
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
    })
});

const carrito = JSON.parse(localStorage.getItem('carritoStorage')) || [];


const agregarAlCarrito = (id) =>{
    const producto = productos.find(producto => producto.id === id);
    const productoEnCarrito = carrito.find(producto => producto.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else{
        carrito.push(producto);
    }
    actualizarCarrito();
}

const contenedorCarrito = document.getElementById("contenedorCarrito")

//creo la card del carrito

function actualizarCarrito () {
    let aux="";
    carrito.forEach(producto => {
        aux +=`
            <div class="card w-25","col-xl-3", "col-md-6", "col-sm-12" >
                <img src="img/${producto.id}.png" class="card-img-top img-fluid">
                <div class="card-body">
                    <h2 class="card-title"> ${producto.nombre} x${producto.cantidad}</h2>
                    <p class="card-text"> $${producto.precio} </p>
                    <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Remove </button>
                </div>
            </div>
            `
    })
    contenedorCarrito.innerHTML = aux;
    

    calcularTotalCompra();
    localStorage.setItem('carritoStorage',JSON.stringify(carrito));
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    carrito.splice(carrito.indexOf(producto) , 1);
    actualizarCarrito();
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {

    carrito.splice(0, carrito.length);

    actualizarCarrito();
});

const totalCompra = document.getElementById("totalCompra");
const calcularTotalCompra= () =>{
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
totalCompra.innerHTML= total
}

actualizarCarrito();