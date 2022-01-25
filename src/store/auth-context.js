import React, { useState } from 'react'

// For saving login
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
})

// Set localStorage token expiration time
const calcExpTime = expTime => {
  const currentTime = new Date().getTime()
  const adjExpTime = new Date(expTime).getTime()
  const remainingTime = adjExpTime - currentTime

  return remainingTime
}

// Export as name export
export const AuthContextProvider = props => {
  // Get token from localStorage
  const initialToken = localStorage.getItem('token')
  // null or token
  const [token, setToken] = useState(initialToken)

  // Converts true or false
  const userIsLoggedIn = !!token

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const loginHandler = (token, expTime) => {
    setToken(token)
    // Store in localStorage
    localStorage.setItem('token', token)

    const remainingTime = calcExpTime(expTime)

    setTimeout(logoutHandler, remainingTime)
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
