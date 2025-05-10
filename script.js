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
  const zip = localStorage.getItem("zip") || "";
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const checkedStores = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
    .map(cb => cb.value.toLowerCase());

  const synonyms = {
    shoes: ["shoe", "sneaker", "boot", "loafer", "sandal", "clog", "runner"],
    sneakers: ["sneaker", "runner", "trainer"],
    sandals: ["sandal", "slide", "slip-on"]
  };

  const expandedQuery = new Set([query]);
  (synonyms[query] || []).forEach(q => expandedQuery.add(q));

  const filtered = allProducts.filter(p => {
    const title = p.title.toLowerCase();
    const titleMatch = [...expandedQuery].some(q => title.includes(q));
    const storeMatch = checkedStores.some(store => p.store.toLowerCase().includes(store));
    const zipMatch = zip === "" || p.store.includes(zip);
    return titleMatch && storeMatch && zipMatch;
  });

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
