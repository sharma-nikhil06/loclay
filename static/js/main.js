let allProducts = [];
let selectedLocation = "";
let selectedStores = ["Target", "Marshalls", "Burlington"];

const zipToStores = {
  "49544": ["target – walker, mi", "burlington – walker, mi", "marshalls – walker, mi"],
  "49503": ["target – grand rapids, mi"]
};

async function loadProducts() {
  const res = await fetch('/products.json');
  allProducts = await res.json();
}

function setLocation() {
  const zipInput = document.getElementById("zipcode");
  selectedLocation = zipInput.value.trim();
  console.log("ZIP set to:", selectedLocation);
}

function searchProducts() {
  const loader = document.getElementById("loader");
  const listDiv = document.getElementById("product-list");
  loader.style.display = "block";
  listDiv.innerHTML = "";

  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const storeCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  selectedStores = Array.from(storeCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const normalizedZip = selectedLocation.trim();
  const allowedStores = (zipToStores[normalizedZip] || []).map(s => s.trim().toLowerCase());

  console.log("Allowed stores for ZIP", normalizedZip, ":", allowedStores);

  const filtered = allProducts.filter(p => {
    const titleMatch = p.title.toLowerCase().includes(searchTerm);
    const locationMatch = allowedStores.length === 0 || allowedStores.includes(p.store.trim().toLowerCase());
    const storeMatch = selectedStores.some(s => p.store.toLowerCase().includes(s.toLowerCase()));

    console.log("Evaluating:", p.title, "| Match:", titleMatch && locationMatch && storeMatch);
    return titleMatch && locationMatch && storeMatch;
  });

  loader.style.display = "none";
  const sortOption = document.getElementById("sortOption").value;

  if (sortOption === "price-asc") {
    filtered.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
  } else if (sortOption === "price-desc") {
    filtered.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
  } else if (sortOption === "store-asc") {
    filtered.sort((a, b) => a.store.localeCompare(b.store));
  }

  if (filtered.length === 0) {
    listDiv.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p class="price">${p.price}</p>
      <p class="store">${p.store}</p>
    `;
    listDiv.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);
