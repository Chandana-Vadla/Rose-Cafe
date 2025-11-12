import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import './index.css'

const CartIcon = ({itemCount}) => (
  <div className="cartContainer" data-testid="cart">
    <FaShoppingCart size={20} />
    {itemCount > 0 && <span className="badge">{itemCount}</span>}
  </div>
)

export default CartIcon
