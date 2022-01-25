import React, { useState } from 'react'

// For saving login
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
})

// Export as name export
export const AuthContextProvider = props => {
  // Get token from localStorage
  const initialToken = localStorage.getItem('token')
  // null or token
  const [token, setToken] = useState(initialToken)

  // Converts true or false
  const userIsLoggedIn = !!token

  const loginHandler = token => {
    setToken(token)
    // Store in localStorage
    localStorage.setItem('token', token)
  }

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('token')
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
