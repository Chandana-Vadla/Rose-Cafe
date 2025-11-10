import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import {HeaderContainer, CafeName, LogoutButton} from './styledComponent'

const Header = () => {
  const {cartList} = useContext(CartContext)
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <HeaderContainer>
      <CafeName as={Link} to="/">
        UNI Resto Cafe
      </CafeName>
      <div>
        <Link to="/cart" data-testid="cart">
          <FaShoppingCart size={22} />
          <span> {cartList.length}</span>
        </Link>
      </div>
      <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
    </HeaderContainer>
  )
}

export default Header
