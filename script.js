fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products-container");
    data.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-store">${product.store}</div>
      `;
      container.appendChild(card);
    });
  });
