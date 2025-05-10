let userLocation = "";
let products = [];

async function loadProducts() {
  const res = await fetch("products.json");
  products = await res.json();
}

function setLocation() {
  const zip = document.getElementById("locationInput").value.trim();
  if (zip) {
    userLocation = zip;
    alert(`Location set to ZIP: ${zip}`);
  }
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query) &&
    p.zip.includes(userLocation)
  );
  renderProducts(filtered);
}

function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p><strong>${p.price}</strong></p>
      <p>${p.store}</p>
    `;
    grid.appendChild(card);
  });
}

window.onload = loadProducts;
