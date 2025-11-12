import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => {
  const {cartList} = useContext(CartContext)
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="headerContainer">
      <Link className="heading-link" to="/">
        <h1 className="cafeName">UNI Resto Cafe</h1>
      </Link>

      <div>
        <Link to="/cart" data-testid="cart">
          <FaShoppingCart size={22} />
          <span> {cartList.length}</span>
        </Link>
      </div>
      <button className="logoutButton" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default Header
