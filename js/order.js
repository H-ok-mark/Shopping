let order = JSON.parse(sessionStorage.getItem("order")) || [];

function renderOrder() {
    const orderDetails = document.getElementById("order-details");
    let total = 0;

    if (order.length === 0) {
        orderDetails.innerHTML = "<p>您尚未选择商品。</p>";
    } else {
        order.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("order-item");
            itemElement.innerHTML = `${item.name} - ¥${item.price} x ${item.quantity}`;
            orderDetails.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        document.getElementById("orderTotal").innerText = `¥${total}`;
    }
}

function submitOrder() {
    alert("订单已提交！");
    sessionStorage.removeItem("order");
    window.location.href = "index.html";
}

window.onload = renderOrder;
