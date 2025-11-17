import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {cartList} = useContext(CartContext)
  const cartCount = cartList.length

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header">
      <Link to="/" className="header-title">
        Tasty Kitchens
      </Link>

      <div className="header-right">
        <Link to="/cart">
          <button type="button" data-testid="cart" className="cart-btn">
            🛒<span className="cart-count">{cartCount}</span>
          </button>
        </Link>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
