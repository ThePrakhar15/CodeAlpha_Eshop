const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct;

// LOAD PRODUCT
function loadProduct() {
  fetch(`${API_URL}/api/products/${id}`)
    .then(res => res.json())
    .then(p => {
      currentProduct = p;

      document.getElementById("img").src = p.image;
      document.getElementById("name").innerText = p.name;
      document.getElementById("price").innerText = "₹" + p.price;
      document.getElementById("desc").innerText = p.description || "No description";

      updateCartCount();
      loadRecommendations(p._id);
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = "<h2>Failed to load product</h2>";
    });
}

// ADD TO CART
function addToCart() {
  if (!currentProduct) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(currentProduct);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert("Added to cart");
}

// CART COUNT
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const span = document.getElementById("cartCount");

  if (span) span.innerText = cart.length;
}

// RECOMMENDATIONS
function loadRecommendations(currentId) {
  fetch(`${API_URL}/api/products`)
    .then(res => res.json())
    .then(data => {
      const list = data.products || [];
      const recDiv = document.getElementById("recommendations");

      recDiv.innerHTML = "";

      list
        .filter(p => p._id !== currentId)
        .slice(0, 4)
        .forEach(p => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <img src="${p.image}" />
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
          `;

          card.onclick = () => {
            location.href = `product.html?id=${p._id}`;
          };

          recDiv.appendChild(card);
        });
    })
    .catch(err => console.error(err));
}

// INIT
window.onload = loadProduct;