function addProduct() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;

  fetch("http://localhost:4000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, price, image, description })
  })
  .then(res => res.json())
  .then(() => {
    alert("Product added");
    location.href = "index.html";
  })
  .catch(err => console.error(err));
}
