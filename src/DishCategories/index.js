import React, {useState} from 'react'
import DishListTwo from '../DishList'
import './index.css'

const categories = [
  'Salads and Soup',
  'From the Barnyard',
  'From the Hen House',
  'Fresh From The Sea',
  'Biryani',
  'Fast Food',
]

const DishCategories = ({itemCount}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <div className="tabs">
        {categories.map((cat, index) => (
          <button
            key={cat}
            className={`tab ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {cat}
          </button>
        ))}
        <div
          className="underline"
          style={{transform: `translateX(${activeIndex * 100}%)`}}
        />
      </div>

      <DishListTwo activeTabCategoryName={categories[activeIndex]} />
    </>
  )
}

export default DishCategories
