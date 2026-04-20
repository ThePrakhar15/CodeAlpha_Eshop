function addProduct() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("category").value.trim();
  const description = document.getElementById("description").value.trim();

  // basic validation (you didn’t have any)
  if (!name || !price || !image || !category || !description) {
    alert("All fields are required");
    return;
  }

  fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      name,
      price,
      image,
      category,
      description
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.message) {
        alert(data.message);
      } else {
        alert("Product added successfully");
        window.location.href = "index.html";
      }
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong");
    });
}