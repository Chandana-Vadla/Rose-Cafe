import {Component} from 'react'
import DishItemTwo from '../DishItem2'

class DishListTwo extends Component {
  state = {
    tableMenuList: [],
  }

  componentDidMount() {
    this.fetchMenuDetails()
  }

  fetchMenuDetails = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    if (response.ok) {
      const data = await response.json()
      const details = data[0]
      const updatedData = {
        restaurantId: details.restaurant_id,
        restaurantName: details.restaurant_name,
        restaurantImage: details.restaurant_image,
        tableId: details.table_id,
        tableName: details.table_name,
        branchName: details.branch_name,
        nexturl: details.nexturl,
        tableMenuList: details.table_menu_list.map(menu => ({
          menuCategory: menu.menu_category,
          menuCategory_id: menu.menu_category_id,
          menuCategory_image: menu.menu_category_image,
          nexturl: menu.nexturl,
          categoryDishes: menu.category_dishes.map(dish => ({
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            dishImage: dish.dish_image,
            dishCurrency: dish.dish_currency,
            dishCalories: dish.dish_calories,
            dishDescription: dish.dish_description,
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
            nexturl: dish.nexturl,
            addonCat: dish.addonCat.map(addonCat => ({
              addonCategory: addonCat.addon_category,
              addonCategory_id: addonCat.addon_category_id,
              addonSelection: addonCat.addon_selection,
              nexturl: addonCat.nexturl,
              addons: addonCat.addons.map(addon => ({
                dishId: addon.dish_id,
                dishName: addon.dish_name,
                dishPrice: addon.dish_price,
                dishImage: addon.dish_image,
                dishCurrency: addon.dish_currency,
                dishCalories: addon.dish_calories,
                dishDescription: addon.dish_description,
                dishAvailability: addon.dish_Availability,
                dishType: addon.dish_Type,
              })),
            })),
          })),
        })),
      }

      this.setState(() => ({
        tableMenuList: updatedData.tableMenuList,
      }))
    }
  }

  render() {
    const {tableMenuList} = this.state
    const {activeTabCategoryName} = this.props
    const activeMenuCategoryDetails =
      tableMenuList.find(
        cat =>
          cat.menuCategory?.trim().toLowerCase() ===
          activeTabCategoryName?.trim().toLowerCase(),
      ) || {}

    const categoryDishes = activeMenuCategoryDetails.categoryDishes || []
    return (
      <ul className="dishes-container">
        {categoryDishes.map(eachDishDetails => (
          <li key={eachDishDetails.dishId}>
            <DishItemTwo eachDishDetails={eachDishDetails} />
          </li>
        ))}
      </ul>
    )
  }
}

export default DishListTwo
