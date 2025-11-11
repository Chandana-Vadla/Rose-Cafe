import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

// ✅ Correct variable name and API for tests
const dishesApiUrl = 'https://apis.ccbp.in/restaurants-list-details'

const RestaurantMenu = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuCategories, setMenuCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [dishes, setDishes] = useState([])
  const [dishQuantities, setDishQuantities] = useState({})
  const {addCartItem} = useContext(CartContext)

  // Fetch dishes list from API
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('jwt_token')
      try {
        const response = await fetch(dishesApiUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch dishes')
        }
        const data = await response.json()
        const details = Array.isArray(data) ? data[0] : data

        // Set restaurant name and menu categories
        setRestaurantName(details.restaurant_name)
        const list = details.table_menu_list || []
        setMenuCategories(list)

        if (list.length > 0) {
          setActiveCategory(list[0].menu_category)
          setDishes(list[0].category_dishes || [])
        }
      } catch (error) {
        console.error('Error fetching dishes:', error)
      }
    }

    fetchData()
  }, [])

  // ✅ Handle switching categories dynamically
  const handleCategoryClick = category => {
    setActiveCategory(category)
    const selected = menuCategories.find(
      each => each.menu_category === category,
    )
    setDishes(selected?.category_dishes || [])
    setDishQuantities({})
  }

  // ✅ Quantity controls
  const incrementQuantity = dishId => {
    setDishQuantities(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const decrementQuantity = dishId => {
    setDishQuantities(prev => {
      const currentQty = prev[dishId] || 0
      if (currentQty === 0) return prev
      const updated = {...prev}
      if (currentQty - 1 === 0) {
        delete updated[dishId]
      } else {
        updated[dishId] = currentQty - 1
      }
      return updated
    })
  }

  // ✅ Add item to cart context
  const onAddToCart = dish => {
    const item = {
      dish_id: dish.dish_id,
      dish_name: dish.dish_name,
      dish_price: dish.dish_price,
      dish_currency: dish.dish_currency,
      dish_image: dish.dish_image,
      quantity: dishQuantities[dish.dish_id] || 1,
    }
    addCartItem(item)
  }

  return (
    <>
      <Header />
      <div className="menu-container">
        {/* ✅ Restaurant header info */}
        <h1 className="restaurant-name">{restaurantName}</h1>
        <p className="orders-text">My Orders</p>

        {/* ✅ Dynamic category tabs */}
        <div className="tabs-container">
          {menuCategories.map(each => (
            <button
              key={each.menu_category}
              type="button"
              className={`tab-button ${
                activeCategory === each.menu_category ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(each.menu_category)}
            >
              {each.menu_category}
            </button>
          ))}
        </div>

        {/* ✅ Dish list */}
        <ul className="dishes-container">
          {dishes.map(dish => {
            const quantity = dishQuantities[dish.dish_id] || 0
            const available =
              dish.dish_Availability === 'true' ||
              dish.dish_Availability === true
            const hasCustomizations = dish.addonCat && dish.addonCat.length > 0

            return (
              <li key={dish.dish_id} className="dish-item">
                <div className="dish-info">
                  <h3 className="dish-name">{dish.dish_name}</h3>
                  <p className="dish-price">
                    {dish.dish_currency} {dish.dish_price}
                  </p>
                  <p className="dish-description">{dish.dish_description}</p>
                  <p className="dish-calories">{dish.dish_calories} Calories</p>

                  {/* ✅ Customization message */}
                  {hasCustomizations && (
                    <p className="customizations-text">
                      Customizations available
                    </p>
                  )}

                  {/* ✅ Availability message */}
                  {!available && <p className="not-available">Not available</p>}
                </div>

                {/* ✅ Dish image */}
                <img
                  src={dish.dish_image}
                  alt={dish.dish_name}
                  className="dish-image"
                />

                {/* ✅ Quantity and Add to Cart section */}
                {available && (
                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => decrementQuantity(dish.dish_id)}
                    >
                      -
                    </button>
                    <p className="quantity-value">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => incrementQuantity(dish.dish_id)}
                    >
                      +
                    </button>

                    {/* ✅ Show Add to Cart only when quantity > 0 */}
                    {quantity > 0 && (
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(dish)}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default RestaurantMenu
