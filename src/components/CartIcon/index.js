import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import {CartContainer, Badge} from './styledComponent'

const CartIcon = ({itemCount}) => (
  <CartContainer data-testid="cart">
    <FaShoppingCart size={20} />
    {itemCount > 0 && <Badge>{itemCount}</Badge>}
  </CartContainer>
)

export default CartIcon
