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
  const [token, setToken] = useState(null)

  // Converts true or false
  const userIsLoggedIn = !!token

  const loginHandler = token => {
    setToken(token)
  }

  const logoutHandler = () => {
    setToken(null)
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
