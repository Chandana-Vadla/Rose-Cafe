import {Component, useState} from 'react'
import {HeaderContainer, CafeName} from './styledComponent'
import CartIcon from '../CartIcon'

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0)

  return (
    <HeaderContainer>
      <CafeName>UNI Resto Cafe</CafeName>
      <CartIcon itemCount={cartItemsCount} />
    </HeaderContainer>
  )
}

export default Header
