const products = [
  { title: "Nike Air Max", price: "$79.99", store: "Target – Walker, MI", zip: "49544" },
  { title: "Adidas Ultraboost", price: "$99.99", store: "Burlington – Grand Rapids, MI", zip: "49503" },
  { title: "Puma Sneakers", price: "$59.99", store: "Marshalls – Kentwood, MI", zip: "49508" }
];

function filterProducts() {
  const zip = document.getElementById('zip-input').value.trim();
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  const filtered = products.filter(product => product.zip === zip);

  if (filtered.length === 0) {
    productList.innerHTML = `<p>No products found for ZIP: ${zip}</p>`;
    return;
  }

  filtered.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <strong>${product.title}</strong><br>
      ${product.price}<br>
      <em>${product.store}</em>
    `;
    productList.appendChild(div);
  });
}
