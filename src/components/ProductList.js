import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  if (products.length === 0) {
    return <p style={{ padding: '20px' }}>No matching products found.</p>;
  }

  return (
    <main id="product-list">
      {products.map((p, i) => <ProductCard key={i} product={p} />)}
    </main>
  );
}

export default ProductList;