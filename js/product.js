// 商品数据（已更新）
const products = [
    { id: 1, name: "巧克力", price: 20, img: "./image/product1.png", category: "零食" },
    { id: 2, name: "薯片", price: 15, img: "./image/product2.png", category: "零食" },
    { id: 3, name: "饼干", price: 10, img: "./image/product3.png", category: "零食" },
    { id: 4, name: "坚果", price: 30, img: "./image/product1.png", category: "零食" },
    { id: 6, name: "PC游戏", price: 100, img: "./image/product3.png", category: "游戏" },
    { id: 7, name: "汽水", price: 8, img: "./image/product1.png", category: "饮料" },
    { id: 8, name: "果汁", price: 12, img: "./image/product2.png", category: "饮料" }
];

// 获取商品展示容器
const productContainer = document.getElementById("product-container");

function renderProducts(filteredProducts) {
    productContainer.innerHTML = ''; // 清空当前商品展示区
    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>价格: ¥${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">加入购物车</button>
        `;
        productContainer.appendChild(productElement);
    });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} 已加入购物车`);
}

function filterProducts(category) {
    if (category === '所有') {
        renderProducts(products); // 渲染所有商品
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts); // 渲染筛选后的商品
    }
}

// 页面加载时默认展示所有商品
window.onload = function () {
    renderProducts(products); // 默认展示所有商品
};
