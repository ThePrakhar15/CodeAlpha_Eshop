const cartDiv = document.getElementById("cartItems");
const totalSpan = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Empty state
if (!cart.length) {
  cartDiv.innerHTML = "<p>Your cart is empty</p>";
}

// Calculate + render
let total = 0;

cart.forEach((p, i) => {
  total += Number(p.price) || 0;

  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <h4>${p.name}</h4>
    <p>₹${p.price}</p>
    <button class="cart-remove" data-index="${i}">Remove</button>
  `;

  cartDiv.appendChild(div);
});

if (totalSpan) totalSpan.innerText = total;

// Delegate remove (cleaner than inline onclick)
cartDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-remove")) {
    const i = Number(e.target.getAttribute("data-index"));
    removeItem(i);
  }
});

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function checkout() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    location.href = "login.html";
    return;
  }

  if (!cart.length) {
    alert("Cart is empty");
    return;
  }

  fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      products: cart,
      total: total
    })
  })
    .then(async (res) => {
      // handle non-200 responses explicitly
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }
      return data;
    })
    .then(() => {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      location.href = "index.html";
    })
    .catch((err) => {
      console.error(err);
      alert(err.message || "Error placing order");
    });
}