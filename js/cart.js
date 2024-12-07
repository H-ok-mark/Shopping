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
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            // 如果商品数量大于 1，只减少数量
            cart[itemIndex].quantity--;
        } else {
            // 如果商品数量为 1，删除该商品
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();  // 更新购物车显示
    }
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
