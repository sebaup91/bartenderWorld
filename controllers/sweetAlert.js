const confirmSweetAlert = document.querySelector("#carrito-acciones-comprar");
const cancelSweetAlert = document.querySelector("#carrito-acciones-vaciar");

confirmSweetAlert.addEventListener("click", () => {
    Swal.fire({
        title: 'Gracias por su compra !',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    })
});

cancelSweetAlert.addEventListener("click", () => {
    Swal.fire({
        title: 'Tu carrito esta vacio ! 😭',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
    })
})