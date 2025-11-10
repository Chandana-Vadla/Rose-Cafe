import React, {createContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = item => {
    setCartList(prevList => {
      const existing = prevList.find(i => i.dish_id === item.dish_id)
      if (existing) {
        return prevList.map(i =>
          i.dish_id === item.dish_id ? {...i, quantity: i.quantity + 1} : i,
        )
      }
      return [...prevList, {...item, quantity: 1}]
    })
  }

  const removeCartItem = id =>
    setCartList(prevList => prevList.filter(i => i.dish_id !== id))

  const incrementCartItemQuantity = id =>
    setCartList(prevList =>
      prevList.map(i =>
        i.dish_id === id ? {...i, quantity: i.quantity + 1} : i,
      ),
    )

  const decrementCartItemQuantity = id =>
    setCartList(prevList =>
      prevList
        .map(i => (i.dish_id === id ? {...i, quantity: i.quantity - 1} : i))
        .filter(i => i.quantity > 0),
    )

  const removeAllCartItems = () => setCartList([])

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
