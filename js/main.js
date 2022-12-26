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

function cargarProductos(productosSeleccionados) {

    // Vaciar primero el contenedor del html
    contenedorProductos.innerHTML = "";
    
    productosSeleccionados.forEach(producto => {

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

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        // sacar la clase active de todos los botones
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        
        // poner la clase active al boton que el usuario selecciono
        e.currentTarget.classList.add("active");

        // filtrar los productos segun su categoria
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    //agregando productos al carrito segun eleccion del usuario
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        //productos enviados al carrito en formato de array
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumeroCarrito () {
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}