import React, {useState, useEffect} from 'react'
import './index.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

function RestaurantMenu() {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuCategories, setMenuCategories] = useState([]) // initialize to empty array
  const [activeCategory, setActiveCategory] = useState('')
  const [dishes, setDishes] = useState([]) // also array
  const [dishQuantities, setDishQuantities] = useState({})
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        // `data` might be an array; from earlier you said data[0]
        // Let's assume it's array
        const details = Array.isArray(data) ? data[0] : data

        setRestaurantName(details.restaurant_name || '')

        const list = details.table_menu_list || []
        setMenuCategories(list)

        if (list.length > 0) {
          const first = list[0]
          setActiveCategory(first.menu_category)
          setDishes(first.category_dishes || [])
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err)
      })
  }, [])

  const updateCartCount = quantities => {
    const totalCount = Object.values(quantities).reduce(
      (acc, val) => acc + val,
      0,
    )
    setCartCount(totalCount)
  }

  const incrementQuantity = dishId => {
    setDishQuantities(prev => {
      const newQty = (prev[dishId] || 0) + 1
      const updatedQuantities = {...prev, [dishId]: newQty}
      updateCartCount(updatedQuantities)
      return updatedQuantities
    })
  }

  const decrementQuantity = dishId => {
    setDishQuantities(prev => {
      const currentQty = prev[dishId] || 0
      if (currentQty === 0) return prev
      const newQty = currentQty - 1
      const updatedQuantities = {...prev, [dishId]: newQty}
      if (newQty === 0) {
        delete updatedQuantities[dishId]
      }
      updateCartCount(updatedQuantities)
      return updatedQuantities
    })
  }

  const handleCategoryClick = category => {
    setActiveCategory(category)
    const selected = menuCategories.find(m => m.menu_category === category)
    setDishes(selected?.category_dishes || [])
    setDishQuantities({})
    setCartCount(0)
  }

  return (
    <div className="app-container">
      <h1>{restaurantName || 'Loading Restaurant...'}</h1>
      <div className="header">
        <p>My Orders</p>
        <p className="cart-count">Cart: {cartCount}</p>
      </div>

      <div className="tabs-container">
        {menuCategories.map(category => (
          <button
            key={category.menu_category}
            className={`tab-button ${
              activeCategory === category.menu_category ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(category.menu_category)}
          >
            {category.menu_category}
          </button>
        ))}
      </div>

      <ul className="dishes-container">
        {dishes.map(dish => {
          const isAvailable = dish.dish_Availability !== 'false'
          const quantity = dishQuantities[dish.dish_id] || 0

          return (
            <li key={dish.dish_id} className="dish-item">
              <div className="dish-text">
                <h3 className="dish-name">{dish.dish_name}</h3>
                <div className="dish-price-calories">
                  <span>
                    {dish.dish_currency} {dish.dish_price}
                  </span>
                  <span>{dish.dish_calories} Calories</span>
                </div>
                <p className="dish-description">{dish.dish_description}</p>

                {dish.addoncat && dish.addoncat.length > 0 && (
                  <p className="customizations">Customizations available</p>
                )}

                {!isAvailable && <p className="not-available">Not available</p>}
              </div>

              {dish.dish_image && (
                <img
                  src={dish.dish_image}
                  alt={dish.dish_name}
                  className="dish-image"
                />
              )}

              {isAvailable ? (
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(dish.dish_id)}>
                    -
                  </button>
                  <p>{quantity}</p>
                  <button onClick={() => incrementQuantity(dish.dish_id)}>
                    +
                  </button>
                </div>
              ) : (
                <div style={{width: '80px'}} />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RestaurantMenu
