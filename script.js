let products = [];
let userZip = "49544";

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

function setLocation() {
  const zipInput = document.getElementById("zipInput");
  userZip = zipInput.value.trim();
  searchProducts();
}

function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedStores = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm) &&
    selectedStores.includes(p.store.split("–")[0].trim())
  );

  renderProducts(filtered);
}

function renderProducts(data) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No products found.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="product-title">${item.title}</div>
      <div class="product-price">${item.price}</div>
      <div class="product-store">${item.store}</div>
    `;

    container.appendChild(card);
  });
}
