let allProducts = [];

async function loadProducts() {
  const res = await fetch("products.json");
  allProducts = await res.json();
}

function setLocation() {
  const zip = document.getElementById("zipcode").value.trim();
  if (!zip) return;
  localStorage.setItem("zip", zip);
}

function searchProducts() {
  const zip = localStorage.getItem("zip");
  const query = document.getElementById("searchInput").value.toLowerCase();
  const checkedStores = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
    .map(cb => cb.value);

  const filtered = allProducts.filter(p => 
    p.title.toLowerCase().includes(query) &&
    checkedStores.some(store => p.store.includes(store)) &&
    p.store.includes(zip)
  );

  renderProducts(filtered);
}

function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="product-title">${p.title}</div>
      <div class="product-price">${p.price}</div>
      <div class="product-store">${p.store}</div>
    `;
    container.appendChild(div);
  });
}

window.onload = loadProducts;
