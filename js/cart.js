// 将一个有效的 JSON 字符串解析为 JavaScript 对象
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// 从本地存储中获取购物车数据，如果没有则初始化为空数组

function updateCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // 清空购物车容器
    let total = 0; // 初始化总价为0

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item"); // 为每个商品创建一个 div 元素并添加类名
        itemElement.innerHTML = `
            <span>${item.name} - ¥${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">删除</button>
        `; // 设置商品名称、价格、数量和删除按钮
        cartContainer.appendChild(itemElement); // 将商品元素添加到购物车容器中
        total += item.price * item.quantity; // 计算总价
    });

    document.getElementById("total").innerText = `¥${total}`; // 更新总价显示
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id); // 查找要删除的商品索引
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            // 如果商品数量大于 1，只减少数量
            cart[itemIndex].quantity--;
        } else {
            // 如果商品数量为 1，删除该商品
            cart.splice(itemIndex, 1);
        }
        // 将  JSON对象转换为JavaScript  字符串
        localStorage.setItem("cart", JSON.stringify(cart)); // 更新本地存储中的购物车数据
        updateCart(); // 更新购物车显示
    }
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("购物车为空，无法结算!"); // 如果购物车为空，提示用户
        return;
    }
    // 将  JSON对象转换为JavaScript  字符串
    sessionStorage.setItem("order", JSON.stringify(cart)); // 将购物车数据保存到会话存储
    localStorage.removeItem("cart"); // 清空本地存储中的购物车数据
    window.location.href = "../html/order.html"; // 跳转到订单页面
}

window.onload = updateCart; // 页面加载时更新购物车显示