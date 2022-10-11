const productos = "json/productos.json";

const contenedorProductos = document.getElementById("contenedorProductos");

//creo la card del catalogo

fetch(productos)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        datos.forEach(producto => {

            const {id, nombre, precio} = producto
        
            const divProducto = document.createElement("div");
            divProducto.classList.add("card","col-xl-3", "col-md-6", "col-sm-12");
            divProducto.innerHTML = `
                                    <div>
                                        <img src="img/${id}.png" class="img-fluid ">
                                        <div class="card-body">
                                            <h2 class="card-title"> ${nombre}</h2>
                                            <p class="card-text"> $${precio} </p>
                                            <button id="boton${id}" class="btn btn-dark"> Add To Cart </button>
                                        </div>
                                    </div>`;
            contenedorProductos.appendChild(divProducto);
            const boton = document.getElementById(`boton${id}`);
            boton.addEventListener("click", () => {
                agregarAlCarrito(id);
            })
        });
        const agregarAlCarrito = (id) =>{
    
            const producto = datos.find(producto => producto.id === id);
        
            const productoEnCarrito = carrito.find(producto => producto.id === id);
        
            productoEnCarrito ? productoEnCarrito.cantidad++ : carrito.push(producto); 
        
            actualizarCarrito();
        
            Toastify( {
                text: "Added To Cart Successfully",
                duration: 1000,
                position: "right",
                close: true,
            }).showToast();
        }
    })

const carrito = JSON.parse(localStorage.getItem('carritoStorage')) || [];




const contenedorCarrito = document.getElementById("contenedorCarrito")

//creo la card del carrito

function actualizarCarrito () {
    let aux="";
    carrito.forEach(producto => {
        const {id, nombre, precio, cantidad} = producto
        aux +=`
            <div class="card w-25","col-xl-3", "col-md-6", "col-sm-12" >
                <img src="img/${id}.png" class="card-img-top img-fluid">
                <div class="card-body">
                    <h2 class="card-title"> ${nombre} x${cantidad}</h2>
                    <p class="card-text"> $${precio} </p>
                    <button onClick = "eliminarDelCarrito(${id})" class="btn btn-primary"> Remove </button>
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
    const productoEnCarrito = carrito.find(producto => producto.id === id);

    productoEnCarrito.cantidad != 1 ? (productoEnCarrito.cantidad--) : carrito.splice(carrito.indexOf(producto) , 1);

    actualizarCarrito();
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    swal.fire({
        title:"Do you want to empty your cart?",
        icon: "info",
        background: "white",
        backdrop: "#2650724f",
        confirmButtonText: "yes",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "b7959b"
    }).then((result) => {
        if (result.isConfirmed) {   

            carrito.splice(0, carrito.length);
            actualizarCarrito();

            swal.fire({
                title:"Cart Emptied",
                icon: "success",
                confirmButtonText:"Aceptar",
            })
        };
    })
});

const totalCompra = document.getElementById("totalCompra");
const calcularTotalCompra= () =>{
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
totalCompra.innerHTML= total
}

/* simulo un boton de finalizar compra */
comprarCarrito.addEventListener("click", () => {

    carrito.splice(0, carrito.length);

    actualizarCarrito();
});

actualizarCarrito();