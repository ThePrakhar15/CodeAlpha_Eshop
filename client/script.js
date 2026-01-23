
const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

// FETCH PRODUCTS
fetch("http://localhost:4000/api/products?limit=120")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products || data;
    showProducts(allProducts);
    updateCartCount();
  })
  .catch(err => console.error(err));

// SHOW PRODUCTS
function showProducts(list) {
  productsDiv.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" />
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button class="btn">Add to Cart</button>
    `;

    // open product page
    card.querySelector("img").onclick = () => {
      location.href = `product.html?id=${p._id}`;
    };

    // add to cart
    card.querySelector("button").onclick = () => {
      addToCart(p);
    };

    productsDiv.appendChild(card);
  });
}

// SEARCH
if (searchInput) {
  searchInput.onkeyup = () => {
    const value = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(value)
    );
    showProducts(filtered);
  };
}

// ADD TO CART
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

// CART COUNT
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const span = document.getElementById("cartCount");
  if (span) span.innerText = cart.length;
}

updateCartCount();
