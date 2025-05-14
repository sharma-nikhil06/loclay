import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">{product.price}</p>
      <p className="store">{product.store}</p>
    </div>
  );
}

export default ProductCard;