let allProducts = [];
let selectedLocation = "";
let selectedStores = ["Target", "Marshalls", "Burlington"];

async function loadProducts() {
  const res = await fetch('/products.json');
  allProducts = await res.json();
}

function setLocation() {
  const zipInput = document.getElementById("zipcode");
  selectedLocation = zipInput.value.trim();
}

function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const storeCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  selectedStores = Array.from(storeCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
  const listDiv = document.getElementById("product-list");
  listDiv.innerHTML = "";
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm) &&
    p.store.toLowerCase().includes(selectedLocation.toLowerCase()) &&
    selectedStores.some(s => p.store.toLowerCase().includes(s.toLowerCase()))
  );
  if (filtered.length === 0) {
    listDiv.innerHTML = "<p>No matching products found.</p>";
    return;
  }
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<img src="${p.image}" alt="${p.title}" />
                      <h3>${p.title}</h3>
                      <p class="price">${p.price}</p>
                      <p class="store">${p.store}</p>`;
    listDiv.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);