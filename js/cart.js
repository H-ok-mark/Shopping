let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <span>${item.name} - ¥${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">删除</button>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    document.getElementById("total").innerText = `¥${total}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("购物车为空，无法结算!");
        return;
    }
    sessionStorage.setItem("order", JSON.stringify(cart));
    localStorage.removeItem("cart");
    window.location.href = "order.html";
}

window.onload = updateCart;
