let allProducts = [];
let selectedLocation = "";
let selectedStores = ["Target", "Marshalls", "Burlington"];

async function loadProducts() {
  try {
    const response = await fetch('products.json');
    allProducts = await response.json();
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function setLocation() {
  const zipInput = document.getElementById("zipInput");
  selectedLocation = zipInput.value.trim();
}

function searchProducts() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const storeCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  selectedStores = Array.from(storeCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const filtered = allProducts.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(searchInput);
    const locationMatch = selectedLocation === "" || product.store.toLowerCase().includes(selectedLocation.toLowerCase());
    const storeMatch = selectedStores.some(store => product.store.toLowerCase().includes(store.toLowerCase()));
    return titleMatch && locationMatch && storeMatch;
  });

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">${product.price}</p>
      <p class="store">${product.store}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);
