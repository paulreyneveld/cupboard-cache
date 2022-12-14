import React, { useContext, useState } from "react"

const AuthContext = React.createContext()

export const AuthProvider = ({ userData, children }) => {
  const [user, setUser] = useState(userData)

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </ AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
