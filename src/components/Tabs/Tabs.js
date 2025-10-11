import React from 'react'
import './Tabs.css'

const Tabs = ({categories, activeCategory, onTabChange}) => (
  <div className="tabs-container">
    <div className="tabs-inner">
      {categories.map(category => {
        const isActive = category === activeCategory
        return (
          <button
            key={category}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  </div>
)

export default Tabs
