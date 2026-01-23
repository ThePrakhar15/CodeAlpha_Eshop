
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct;

// fetch product
fetch(`http://localhost:4000/api/products/${id}`)
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
  .catch(err => console.error(err));


// add to cart
function addToCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(currentProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}


// navbar cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const span = document.getElementById("cartCount");
  if (span) span.innerText = cart.length;
}



function loadRecommendations(currentId){
  fetch("http://localhost:4000/api/products")
    .then(res => res.json())
    .then(data => {
      const list = data.products || data;
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
            location.href = "product.html?id=" + p._id;
          };

          recDiv.appendChild(card);
        });
    })
    .catch(err => console.error(err));
}
