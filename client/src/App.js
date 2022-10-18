import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import Loader from './components/Loader'
import Home from './components/Home'
import { MDBContainer } from 'mdb-react-ui-kit'
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from './context/UserContext'

const App = () =>  {

  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])


  return (
    <div className="App">

    <Router>
        <MDBContainer breakpoint='lg'>
        <Navigation />
        {/* { userContext.token === null ? (
          <Home />)
         : userContext.token ? (
          <Welcome/>
        ) : (<Loader /> )} */}

        <Routes>
            <Route exact path='/' element={
            userContext.token ?
            <Welcome />
            :
            <Home />
            }></Route>
            <Route exact path='/welcome' element={< Welcome />}></Route>
            <Route exact path='/login' element={
            userContext.token ?
            <Welcome />
            :
            < Login />
            }></Route>
            <Route exact path='/signup' element={< Signup />}></Route>
            <Route exact path='/logout' element={< Logout />}></Route>
        </Routes>
      </MDBContainer>
    </Router>
    </div>

  );
}

export default App
