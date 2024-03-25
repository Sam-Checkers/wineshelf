import React, { useState, useEffect } from 'react';
import './Inventory.css';
import backgroundImage from './Brewery.jpg';

const Inventory = () => {
  const [wines, setWines] = useState([]);
  const [selectedWine, setSelectedWine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch('https://winery-1.onrender.com/get_all_wines');
        if (response.ok) {
          const data = await response.json();
          setWines(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch wines');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching wines:', error);
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  const handleWineClick = (wine) => {
    setSelectedWine(wine);
  };

  const handleCloseModal = () => {
    setSelectedWine(null);
  };

  const handlePreviousWine = () => {
    const currentIndex = wines.findIndex(wine => wine.name === selectedWine.name);
    const previousIndex = (currentIndex - 1 + wines.length) % wines.length;
    setSelectedWine(wines[previousIndex]);
  };

  const handleNextWine = () => {
    const currentIndex = wines.findIndex(wine => wine.name === selectedWine.name);
    const nextIndex = (currentIndex + 1) % wines.length;
    setSelectedWine(wines[nextIndex]);
  };

  const getImageUrl = (wineName) => {
    return `https://winery-1.onrender.com/static/images/${wineName.toLowerCase()}-i.png`;
  };

  return (
    <div className="inventory-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="wine-list">
        {loading ? (
          <p>Loading wines...</p>
        ) : (
          <div>
            {wines.map((wine, index) => (
              <div key={index} onClick={() => handleWineClick(wine)} className="wine-item">
                <p>{wine.name} - {wine.type} - {wine.region}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedWine && (
        <div className="selected-wine">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <span className="arrow left-arrow" onClick={handlePreviousWine}>&lt;</span>
              <h2>{selectedWine.name}</h2>
              <img src={getImageUrl(selectedWine.name)} alt={selectedWine.name} className="centered-image" />
              <span className="arrow right-arrow" onClick={handleNextWine}>&gt;</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;