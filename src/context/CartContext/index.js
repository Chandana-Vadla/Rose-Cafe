import React, {createContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  // normalize ID so tests do not break
  const getDishId = item =>
    item.dish_id || item.dishId || item.id || String(item.dish_id)

  // ===========================
  //   ADD ITEM TO CART
  // ===========================
  const addCartItem = item => {
    const id = getDishId(item)

    const existing = cartList.find(each => getDishId(each) === id)

    if (existing) {
      // item already exists — increase quantity but DO NOT add new entry
      const updated = cartList.map(each => {
        if (getDishId(each) === id) {
          return {...each, quantity: each.quantity + item.quantity}
        }
        return each
      })

      setCartList(updated)
    } else {
      // new item — push to array
      setCartList(prev => [...prev, {...item}])
    }
  }

  // ===========================
  // REMOVE ALL
  // ===========================
  const removeAllCartItems = () => {
    setCartList([])
  }

  // ===========================
  // REMOVE ONE ITEM
  // ===========================
  const removeCartItem = id => {
    setCartList(prev => prev.filter(each => getDishId(each) !== id))
  }

  // ===========================
  // INCREMENT QUANTITY
  // ===========================
  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(each => {
        if (getDishId(each) === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    )
  }

  // ===========================
  // DECREMENT QUANTITY
  // ===========================
  const decrementCartItemQuantity = id => {
    setCartList(prev =>
      prev
        .map(each => {
          if (getDishId(each) === id) {
            if (each.quantity === 1) {
              return null // remove item
            }
            return {...each, quantity: each.quantity - 1}
          }
          return each
        })
        .filter(Boolean),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeAllCartItems,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
