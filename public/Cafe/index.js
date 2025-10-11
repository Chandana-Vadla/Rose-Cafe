import {Component, useState} from 'react'
import Header from '../Header'
import DishCategories from '../DishCategories'

class Cafe extends Component {
  render() {
    return (
      <div>
        <Header />
        <DishCategories />
      </div>
    )
  }
}

export default Cafe
