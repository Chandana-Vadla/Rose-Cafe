import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import RestaurantMenu from './components/RestaurantMenu'
import Cart from './components/Cart'
import {CartProvider} from './context/CartContext'
import './App.css'

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={RestaurantMenu} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Redirect to="/login" />
      </Switch>
    </CartProvider>
  </BrowserRouter>
)

export default App
