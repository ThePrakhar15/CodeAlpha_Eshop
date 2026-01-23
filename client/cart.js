
const cartDiv = document.getElementById("cartItems");
const totalSpan = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartDiv.innerHTML = "<p>Your cart is empty</p>";
}

let total = 0;

cart.forEach((p, i) => {
  total += Number(p.price);

  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${p.image}" />
    <h4>${p.name}</h4>
    <p>₹${p.price}</p>
    <button class="cart-remove" onclick="removeItem(${i})">Remove</button>
  `;

  cartDiv.appendChild(div);
});

if (totalSpan) totalSpan.innerText = total;


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

  fetch("http://localhost:4000/api/orders", {
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
    .then(res => res.json())
    .then(() => {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      location.href = "index.html";
    })
    .catch(err => console.error(err));
}
