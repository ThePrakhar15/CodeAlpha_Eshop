const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

// LOAD PRODUCTS
function loadProducts() {
  fetch(`${API_URL}/api/products?limit=120`)
    .then(res => res.json())
    .then(data => {
      allProducts = data.products || [];
      showProducts(allProducts);
      updateCartCount();
    })
    .catch(err => {
      console.error(err);
      productsDiv.innerHTML = "<p>Failed to load products</p>";
    });
}

// SHOW PRODUCTS
function showProducts(list) {
  productsDiv.innerHTML = "";

  if (!list.length) {
    productsDiv.innerHTML = "<p>No products found</p>";
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button class="btn">Add to Cart</button>
    `;

    // OPEN PRODUCT PAGE
    card.querySelector("img").onclick = () => {
      location.href = `product.html?id=${p._id}`;
    };

    // ADD TO CART
    card.querySelector("button").onclick = () => {
      addToCart(p);
    };

    productsDiv.appendChild(card);
  });
}

// SEARCH
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    showProducts(filtered);
  });
}

// ADD TO CART
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to cart");
}

// UPDATE CART COUNT
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const span = document.getElementById("cartCount");

  if (span) span.innerText = cart.length;
}

// INIT
window.onload = () => {
  loadProducts();
  updateCartCount();
};