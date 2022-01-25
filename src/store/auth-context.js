import React, { useState, useEffect, useCallback } from 'react'

let logoutTimer

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

const retrievedStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpDate = localStorage.getItem('expTime')

  const remainingTime = calcExpTime(storedExpDate)

  if (remainingTime <= 60000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expTime')
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
  }
}

// Export as name export
export const AuthContextProvider = props => {
  const tokenData = retrievedStoredToken()

  let initialToken
  if (tokenData) {
    // Get token from localStorage
    initialToken = tokenData.token
  }

  // null or token
  const [token, setToken] = useState(initialToken)

  // Converts true or false
  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expTime')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expTime) => {
    setToken(token)
    // Store in localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('expTime', expTime)

    const remainingTime = calcExpTime(expTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration)
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

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
