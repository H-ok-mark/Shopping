const products = [
    { id: 1, name: "巧克力", price: 20, img: "./image/product1.png" },
    { id: 2, name: "薯片", price: 15, img: "./image/product2.png" },
    { id: 3, name: "饼干", price: 10, img: "./image/product3.png" },
    { id: 4, name: "坚果", price: 30, img: "./image/product1.png" }
];

const productContainer = document.getElementById("product-container");

function renderProducts() {
    products.forEach(product => {
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

window.onload = renderProducts;
