import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const token = Cookies.get('jwt_token')
  if (token) {
    return <Redirect to="/" />
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = props
      history.replace('/')
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1 className="login-heading">Login</h1>

        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="login-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
