import React from 'react'
import './index.css'

const DishItem = ({dish, count, onIncrement, onDecrement}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    addonCat,
  } = dish

  const hasCustomizations = addonCat && addonCat.length > 0

  return (
    <div className="dish-item">
      <img src={dishImage} alt={dishName} className="dish-image" />
      <div className="dish-details">
        <h3 className="dish-name">{dishName}</h3>
        <p className="dish-desc">{dishDescription}</p>
        <div className="dish-info">
          <span className="dish-price">
            {dishCurrency} {dishPrice}
          </span>
          <span className="dish-calories">{dishCalories} cal</span>
        </div>
        {hasCustomizations && (
          <p className="customizations-text">Customizations available</p>
        )}
        <div className="counter-container">
          <button
            className="counter-btn"
            onClick={onDecrement}
            disabled={count === 0}
          >
            −
          </button>
          <span className="counter-value">{count}</span>
          <button className="counter-btn" onClick={onIncrement}>
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default DishItem
