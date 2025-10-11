import {Component} from 'react'
import './index.css'

class DishItemTwo extends Component {
  state = {
    dishCount: 0,
  }

  renderDishTypeElement = dishType => {
    const color = dishType === 1 ? 'green' : 'red'
    return (
      <div className="box">
        <div className="dot" style={{backgroundColor: color}}></div>
      </div>
    )
  }

  decreaseItemCount = () => {
    this.setState(prevState => ({
      dishCount: prevState.dishCount - 1,
    }))
  }

  increaseItemCount = () => {
    this.setState(prevState => ({
      dishCount: prevState.dishCount + 1,
    }))
  }

  render() {
    const {eachDishDetails} = this.props
    const {
      dishType,
      dishName,
      dishCurrency,
      dishPrice,
      dishDescription,
      addonCat,
      dishCalories,
      dishImage,
    } = eachDishDetails
    const {dishCount} = this.state
    return (
      <div className="dish-item-container">
        {this.renderDishTypeElement(dishType)}
        <div className="dish-details-container">
          <h2>{dishName}</h2>
          <p>
            {dishCurrency}
            <span>{dishPrice}</span>
          </p>
          <p>{dishDescription}</p>
          <div className="dish-count-container">
            <button onClick={this.decreaseItemCount} type="button">
              -
            </button>
            <span className="dishCount">{dishCount}</span>
            <button onClick={this.increaseItemCount} type="button">
              +
            </button>
          </div>
          {addonCat.length > 0 && <p>Customizations available</p>}
        </div>
        <p>{dishCalories} calories</p>
        <img src={dishImage} className="dishImage" />
      </div>
    )
  }
}

export default DishItemTwo
