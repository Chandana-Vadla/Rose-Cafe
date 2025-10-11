import React from 'react'
import DishItem from '../DishItem'
import './index.css'

const DishList = ({
  tableMenuList,
  activeCategory,
  onIncrement,
  onDecrement,
  dishCounts,
}) => {
  const activeMenu = tableMenuList.find(
    menu =>
      menu.menuCategory?.trim().toLowerCase() ===
      activeCategory?.trim().toLowerCase(),
  )

  if (!activeMenu) {
    return <p className="no-dishes">No dishes found for this category.</p>
  }

  const {categoryDishes} = activeMenu

  return (
    <ul className="dishes-container">
      {categoryDishes.map(dish => (
        <li key={dish.dishId}>
          <DishItem
            dish={dish}
            count={dishCounts[dish.dishId] || 0}
            onIncrement={() => onIncrement(dish.dishId)}
            onDecrement={() => onDecrement(dish.dishId)}
          />
        </li>
      ))}
    </ul>
  )
}

export default DishList
