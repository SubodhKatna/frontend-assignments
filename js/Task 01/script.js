const api = "https://fakestoreapi.com/products";

const container = document.getElementById("products");

fetch(api)
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => {
        console.log("Error:", error);
    });

function displayProducts(products) {
    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${product.image}" alt="">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <button>Buy Now</button>
        `;

        container.appendChild(card);
    });
}