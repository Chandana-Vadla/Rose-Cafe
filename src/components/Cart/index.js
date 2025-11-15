import {useContext} from 'react'
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

  const renderEmpty = () => (
    <div className="empty-cart">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1>Your Cart is Empty</h1>
    </div>
  )

  const renderItems = () => (
    <div className="cart-items-container">
      <div className="cart-header-row">
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
          <li className="cart-item" key={item.dish_id}>
            <img
              src={item.dish_image}
              alt={item.dish_name}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <h1 className="cart-item-name">{item.dish_name}</h1>
              <p className="cart-item-price">
                {item.dish_currency} {item.dish_price * item.quantity}
              </p>

              <div className="quantity-row">
                <button
                  type="button"
                  onClick={() => decrementCartItemQuantity(item.dish_id)}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  type="button"
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
      {cartList.length === 0 ? renderEmpty() : renderItems()}
    </>
  )
}

export default Cart
