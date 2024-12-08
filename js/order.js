let order = JSON.parse(sessionStorage.getItem("order")) || [];
// 从会话存储中获取订单数据，如果没有则初始化为空数组

function renderOrder() {
    const orderDetails = document.getElementById("order-details");
    // 获取订单详情的容器元素
    let total = 0;
    // 初始化总价为0

    if (order.length === 0) {
        orderDetails.innerHTML = "<p>您尚未选择商品。</p>";
        // 如果订单为空，显示提示信息
    } else {
        order.forEach(item => {
            const itemElement = document.createElement("div");
            // 为每个商品创建一个 div 元素
            itemElement.classList.add("order-item");
            // 添加类名
            itemElement.innerHTML = `${item.name} - ¥${item.price} x ${item.quantity}`;
            // 设置商品名称、价格和数量
            orderDetails.appendChild(itemElement);
            // 将商品元素添加到订单详情容器中
            total += item.price * item.quantity;
            // 计算总价
        });

        document.getElementById("orderTotal").innerText = `¥${total}`;
        // 更新总价显示
    }
}

function submitOrder() {
    if (order.length === 0) {
        alert("订单为空，无法提交!");
        // 如果订单为空，提示用户
        return;
    }
    alert("订单已提交！");
    // 提示用户订单已提交
    sessionStorage.removeItem("order");
    // 清空会话存储中的订单数据
    window.location.href = "../html/index.html";
    // 跳转到主页
}

window.onload = renderOrder;
// 页面加载时渲染订单详情