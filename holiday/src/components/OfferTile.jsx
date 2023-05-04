import React from 'react';
import PropTypes from 'prop-types';

import './OfferTile.css';

const OfferTile = ({ name, visitedCount, price, imageUrl, description, clickHandler }) => {
  const handleButtonClick = () => {
    clickHandler();
  };

  return (
    <div className="offer-tile">
      <div className="offer-tile-image-container">
        <img src={imageUrl} alt={name} className="offer-tile-image" />
        <button className="offer-tile-button" onClick={handleButtonClick}>
          Mark Visited
        </button>
      </div>
      <div className="offer-tile-details">
        <h2 className="offer-tile-name">{name}</h2>
        <p className="offer-tile-description">{description || ''}</p>
        <div className="offer-tile-stats">
          <span className="offer-tile-visited-count">{visitedCount} visited</span>
          <span className="offer-tile-price">{price}</span>
        </div>
      </div>
    </div>
  );
};

OfferTile.propTypes = {
  name: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};

export default OfferTile;