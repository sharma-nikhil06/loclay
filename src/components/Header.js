import React, { useState } from 'react';

function Header({ onSearch }) {
  const [zip, setZip] = useState('');
  const [term, setTerm] = useState('');
  const [stores, setStores] = useState(["Target", "Marshalls", "Burlington"]);

  const handleCheckbox = (store) => {
    setStores(prev =>
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  };

  const triggerSearch = () => {
    onSearch(term, zip, stores);
  };

  return (
    <header className="top-bar">
      <img src="/logo.png" alt="Loclay Logo" className="logo" />
      <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter ZIP code" />
      <button onClick={triggerSearch}>Set Location</button>
      {["Target", "Marshalls", "Burlington"].map(store => (
        <label key={store}>
          <input
            type="checkbox"
            checked={stores.includes(store)}
            onChange={() => handleCheckbox(store)}
          />
          {store}
        </label>
      ))}
      <input type="text" value={term} onChange={e => setTerm(e.target.value)} placeholder="Search for items..." />
      <button onClick={triggerSearch}>Search</button>
    </header>
  );
}

export default Header;