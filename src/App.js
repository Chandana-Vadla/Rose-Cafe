import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import RestaurantMenu from './components/RestaurantMenu'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={RestaurantMenu} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Redirect to="/login" />
  </Switch>
)

export default App
