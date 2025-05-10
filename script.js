let products = [];
let selectedLocation = '';
let selectedStores = ["Target", "Marshalls", "Burlington"];

fetch("combined_products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

function renderProducts(filtered) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image || 'placeholder.jpg'}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p><strong>${p.price}</strong></p>
      <p style="font-size: 12px;">${p.store}</p>
    `;
    container.appendChild(card);
  });
}

function setLocation() {
  selectedLocation = document.getElementById("locationInput").value.trim();
  filterProducts();
}

function searchProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(term) &&
    selectedStores.some(store => p.store.includes(store)) &&
    (selectedLocation === "" || p.store.includes(selectedLocation))
  );
  renderProducts(filtered);
}

function filterByCategory(category) {
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(category.toLowerCase()) &&
    selectedStores.some(store => p.store.includes(store)) &&
    (selectedLocation === "" || p.store.includes(selectedLocation))
  );
  renderProducts(filtered);
}

function filterProducts() {
  selectedStores = Array.from(document.querySelectorAll(".store-filters input:checked")).map(input => input.value);
  searchProducts();
}
