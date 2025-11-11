let preveiwContainer = document.querySelector(".products_preview");
let previewBox = preveiwContainer.querySelectorAll(".preview");

document.querySelectorAll(".products_container .product").forEach(product =>{
    product.onclick = () =>{
        preveiwContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        previewBox.forEach(preview =>{
            let target = preview.getAttribute("data-target");
            if(name == target){
                preview.classList.add("active");
            }
        });
    };
});



previewBox.forEach(close =>{
    close.querySelector(".fa-times").onclick = () =>{
        close.classList.remove("active");
        preveiwContainer.style.display = "none";
    };
});
// ==== CARRITO FLOTANTE Y PAGO ====
let carrito = [];
const openCartBtn = document.getElementById("open_cart");
const cartContainer = document.querySelector(".cart_container");
const closeCartBtn = document.getElementById("close_cart");
const checkoutBtn = document.getElementById("checkout");
const cartItems = document.querySelector(".cart_items");
const cartTotal = document.getElementById("cart_total");
const modalPago = document.getElementById("modalPago");
const cerrarModal = document.querySelector(".cerrar");
const montoTotal = document.getElementById("montoTotal");
const qrImage = document.getElementById("qrImage");

// Mostrar carrito
openCartBtn.addEventListener("click", () => {
    cartContainer.style.display = "block";
});

// Cerrar carrito
closeCartBtn.addEventListener("click", () => {
    cartContainer.style.display = "none";
});

// Agregar producto al carrito (asegúrate de que los botones tengan clase .cart)
document.querySelectorAll(".cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let productCard = btn.closest(".preview");
        let name = productCard.querySelector("h3").innerText;
        let price = parseFloat(productCard.querySelector(".price").innerText.replace("Bs.", "").trim());
        carrito.push({ name, price });
        actualizarCarrito();
    });
});

// Actualizar carrito
function actualizarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        let p = document.createElement("p");
        p.textContent = `${item.name} - Bs. ${item.price}`;
        cartItems.appendChild(p);
        total += item.price;
    });
    cartTotal.textContent = total;
}

// ==== BOTÓN PAGAR Y MODAL QR ====
checkoutBtn.addEventListener("click", () => {
    let total = carrito.reduce((sum, p) => sum + p.price, 0);
    if (total === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    montoTotal.textContent = "Bs. " + total;
    modalPago.style.display = "flex";

    // Mostrar tu imagen QR real
    qrImage.style.display = "block";
});

// Cerrar modal con la X
cerrarModal.onclick = () => {
    modalPago.style.display = "none";
};

// Cerrar modal al hacer clic fuera
window.onclick = (e) => {
    if (e.target == modalPago) {
        modalPago.style.display = "none";
    }
};