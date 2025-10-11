import {FaShoppingCart} from 'react-icons/fa'
import {CartContainer, Badge} from './styledComponent'

const CartIcon = ({itemCount}) => (
  <CartContainer>
    <FaShoppingCart size={24} />
    {itemCount > -1 && <Badge>{itemCount}</Badge>}
  </CartContainer>
)

export default CartIcon
