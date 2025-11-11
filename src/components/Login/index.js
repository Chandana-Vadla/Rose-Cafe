import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useHistory, Redirect} from 'react-router-dom'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  // If already logged in, redirect to home
  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      history.replace('/')
    }
  }, [history])

  const onSubmitForm = async event => {
    event.preventDefault()
    setErrorMsg('')

    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      // headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(loginUrl, options)
      const data = await response.json()

      if (response.ok) {
        // set cookie and navigate to home
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        setErrorMsg(data.error_msg || 'Login failed')
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  // If cookie exists, render Redirect (safe double-check)
  const token = Cookies.get('jwt_token')
  if (token) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg-container">
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form" onSubmit={onSubmitForm}>
          <div className="input-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {errorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
