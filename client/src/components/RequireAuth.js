import { useAuth } from "../context/AuthContext"
import { Outlet } from 'react-router-dom'
import Welcome from "./Welcome"

const RequireAuth = ( { ...rest }) => {
    let [user, setUser] = useAuth()

    if (!user) {
      return (
        <><p>Not authorized</p></>
      )
    }    

    return <Outlet />
  }

  export default RequireAuth