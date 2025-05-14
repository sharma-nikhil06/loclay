import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AdsBar from './components/AdsBar';
import CategoryNav from './components/CategoryNav';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedStores, setSelectedStores] = useState(["Target", "Marshalls", "Burlington"]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const handleSearch = (term, loc, stores) => {
    setSearchTerm(term);
    setLocation(loc);
    setSelectedStores(stores);
  };

  const filteredProducts = products.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = location === "" || product.store.toLowerCase().includes(location.toLowerCase());
    const storeMatch = selectedStores.some(store => product.store.toLowerCase().includes(store.toLowerCase()));
    return titleMatch && locationMatch && storeMatch;
  });

  return (
    <div>
      <Header onSearch={handleSearch} />
      <AdsBar />
      <CategoryNav />
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;