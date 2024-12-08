// 商品数据（已更新）
const products = [
    { id: 1, name: "巧克力", price: 49, img: "../image/巧克力.png", category: "零食" },
    { id: 2, name: "薯片", price: 12, img: "../image/薯片.png", category: "零食" },
    { id: 3, name: "燕麦曲奇", price: 6, img: "../image/饼干.png", category: "零食" },
    { id: 4, name: "椰子水", price: 7, img: "../image/椰子水.png", category: "饮料" },
    { id: 5, name: "什锦软糖", price: 10, img: "../image/什锦软糖.png", category: "糖果" },
    { id: 6, name: "蛋糕卷", price: 25, img: "../image/蛋糕卷.png", category: "面包" },
    { id: 7, name: "苹果汁", price: 15, img: "../image/苹果汁.png", category: "饮料" }
];

// 获取商品展示容器
const productContainer = document.getElementById("product-container");

function renderProducts(filteredProducts) {
    productContainer.innerHTML = ''; // 清空当前商品展示区
    filteredProducts.forEach(product => {
        const productElement = document.createElement("div"); // 创建一个 div 元素来展示商品
        productElement.classList.add("product"); // 为商品元素添加类名
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}"> 
            <h3>${product.name}</h3>
            <p>价格: ¥${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">加入购物车</button>
        `; // 设置商品的图片、名称、价格和加入购物车按钮
        productContainer.appendChild(productElement); // 将商品元素添加到商品展示容器中
    });
}
// 将一个有效的 JSON 字符串解析为 JavaScript 对象
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// 从本地存储中获取购物车数据，如果没有则初始化为空数组

function addToCart(id, name, price) {
    const itemIndex = cart.findIndex(item => item.id === id); // 查找购物车中是否已有该商品
    // findIndex() 返回的是一个 整数索引值，从0开始
    if (itemIndex > -1) {
        cart[itemIndex].quantity++; // 如果已有该商品，增加其数量
    } else {
        cart.push({ id, name, price, quantity: 1 }); // 如果没有该商品，添加到购物车
    }
    // 将 JavaScript 对象转换为 JSON 字符串
    localStorage.setItem("cart", JSON.stringify(cart)); // 更新本地存储中的购物车数据
    alert(`${name} 已加入购物车`); // 提示用户商品已加入购物车
}

function filterProducts(category) {
    if (category === '所有') {
        renderProducts(products); // 渲染所有商品
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        // 根据类别筛选商品
        renderProducts(filteredProducts); // 渲染筛选后的商品
    }
}

// 页面加载时默认展示所有商品
window.onload = function () {
    renderProducts(products); // 默认展示所有商品
};