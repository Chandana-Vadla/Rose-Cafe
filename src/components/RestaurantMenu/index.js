import React, {useState, useEffect, useContext} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const RestaurantMenu = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuCategories, setMenuCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [dishes, setDishes] = useState([])
  const [dishQuantities, setDishQuantities] = useState({})

  const {addCartItem} = useContext(CartContext)

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(dishesApiUrl)
        const data = await response.json()

        const details = Array.isArray(data) ? data[0] : data

        setRestaurantName(details.restaurant_name)

        const categories = details.table_menu_list
        setMenuCategories(categories)

        if (categories.length > 0) {
          setActiveCategory(categories[0].menu_category)
          setDishes(categories[0].category_dishes)
        }
      } catch (err) {
        console.log('Fetch error:', err)
      }
    }

    fetchMenuData()
  }, [])

  const changeCategory = category => {
    setActiveCategory(category)
    const matched = menuCategories.find(each => each.menu_category === category)
    setDishes(matched ? matched.category_dishes : [])
    setDishQuantities({})
  }

  // quantity handling
  const increaseQty = id => {
    setDishQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const decreaseQty = id => {
    setDishQuantities(prev => {
      if (!prev[id]) return prev // do NOT decrement when 0
      if (prev[id] === 1) {
        const updated = {...prev}
        delete updated[id]
        return updated
      }
      return {...prev, [id]: prev[id] - 1}
    })
  }

  // add to cart
  const addDishToCart = dish => {
    const qty = dishQuantities[dish.dish_id] || 1

    const item = {
      dish_id: dish.dish_id,
      dish_name: dish.dish_name,
      dish_price: dish.dish_price,
      dish_currency: dish.dish_currency,
      dish_image: dish.dish_image,
      quantity: qty,
    }

    addCartItem(item)
  }

  return (
    <>
      <Header />

      <div className="menu-container">
        <h1 className="restaurant-name">{restaurantName}</h1>
        <p className="orders-text">My Orders</p>

        {/* CATEGORY TABS */}
        <div className="tabs-container">
          {menuCategories.map(each => (
            <button
              key={each.menu_category}
              className={`menu-category-item ${
                activeCategory === each.menu_category ? 'active-category' : ''
              }`}
              type="button"
              onClick={() => changeCategory(each.menu_category)}
            >
              {each.menu_category}
            </button>
          ))}
        </div>

        {/* DISH LIST */}
        <ul className="dishes-container">
          {dishes.map(dish => {
            const qty = dishQuantities[dish.dish_id] || 0

            const available = dish.dish_Availability === true

            return (
              <li key={dish.dish_id} className="dish-item">
                <div className="dish-info">
                  <h1 className="dish-name">{dish.dish_name}</h1>

                  <p className="dish-price">
                    {dish.dish_currency} {dish.dish_price}
                  </p>

                  <p className="dish-description">{dish.dish_description}</p>

                  <p className="dish-calories">{dish.dish_calories} Calories</p>

                  {dish.addonCat && dish.addonCat.length > 0 && (
                    <p className="customizations-text">
                      Customizations available
                    </p>
                  )}

                  {!available && <p className="not-available">Not available</p>}
                </div>

                <img
                  src={dish.dish_image}
                  alt={dish.dish_name}
                  className="dish-image"
                />

                {/* quantity */}
                {available && (
                  <div className="quantity-container">
                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={() => decreaseQty(dish.dish_id)}
                    >
                      -
                    </button>

                    <p className="quantity-value">{qty}</p>

                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={() => increaseQty(dish.dish_id)}
                    >
                      +
                    </button>

                    {qty > 0 && (
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => addDishToCart(dish)}
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
