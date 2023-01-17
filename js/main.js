let productos = []

// Carga de productos en el html desde js
const contenedorProductos = document.querySelector("#contenedor-productos");

// Seccionar los producos de acuerdo a sus categorias
const botonesCategorias = document.querySelectorAll(".boton-categoria");

// cambiar el titulo principal
const tituloPrincipal = document.querySelector("#titulo-principal");

// agregar productos al carrito
let botonesAgregar = document.querySelectorAll(".producto-agregar");

// sumar la cantidad de productos en el carrito del html
const numeroCarrito = document.querySelector("#numero-carrito")

const cargarProductos = async () => {

// Vaciar primero el contenedor del html
    contenedorProductos.innerHTML = "";

    productos = await homeController()

    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar()
};

cargarProductos();

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", async (e) => {

        // sacar la clase active de todos los botones
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        
        // poner la clase active al boton que el usuario selecciono
        e.target.classList.add("active");

        // filtrar los productos segun su categoria
        if (e.target.id != "todos") {
            productos = await homeController()
            const productoCategoria = productos.find(producto => producto.categoria.id === e.target.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.target.id);
            actualizarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
})

const actualizarProductos = (productosBoton) => {
    contenedorProductos.innerHTML = "",

    productosBoton.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();        
};


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Numero que corresponde a la cantidad de productos en el carrito

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}



const agregarAlCarrito = async (e) => {

    const idBoton = e.currentTarget.id;
    productos = await homeController()
    //agregando productos al carrito segun eleccion del usuario
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

        // Libreria toastify ( nose si esta bien colocado, pero funciona)
        Toastify({
            text: "Producto agregado",
            duration: 2000,            
            gravity: "bottom",
            position: "left", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to right, rgb(245, 84, 84), #de5900)",
            color: "black",
            },
            onClick: function(){} 
        }).showToast();
    } else {
        //productos enviados al carrito en formato de array
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

// El numero del carrito dentro del "index.html" aumenta segun la cantidad elegida por el usuario

function actualizarNumeroCarrito () {
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}