import React, {useContext} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-text">Your Cart is Empty</h1>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-content">
      <div className="cart-header">
        <h1>My Cart</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>

      <ul className="cart-list">
        {cartList.map(item => (
          <li key={item.dish_id} className="cart-item">
            <img
              src={item.dish_image}
              alt={item.dish_name}
              className="cart-dish-image"
            />
            <div className="cart-item-details">
              <h1 className="dish-name">{item.dish_name}</h1>
              <p className="dish-price">
                {item.dish_currency}{' '}
                {(item.dish_price * item.quantity).toFixed(2)}
              </p>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => decrementCartItemQuantity(item.dish_id)}
                >
                  -
                </button>
                <p className="quantity-count">{item.quantity}</p>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => incrementCartItemQuantity(item.dish_id)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeCartItem(item.dish_id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Header />
      <div className="cart-container">
        {cartList.length === 0 ? renderEmptyCart() : renderCartItems()}
      </div>
    </>
  )
}

export default Cart
