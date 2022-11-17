import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import { MDBContainer } from 'mdb-react-ui-kit'
import { AuthProvider } from './context/AuthContext'
import Home from './components/Home'
import GroceryStore from './components/GroceryStore'
import RequireAuth from './components/RequireAuth'
import ShoppingList from './components/ShoppingList'
import Cupboard from './components/Cupboard'


const App = () =>  {

  let user = localStorage.getItem("user")
  user = JSON.parse(user)

  return (
    <AuthProvider userData={user}>
    <div className="App">
    <Router>
        <MDBContainer breakpoint='lg'>
        <Navigation />
        <Routes>
            <Route exact path='/' element={<Home /> }></Route>
            <Route exact path='/login' element ={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route element={<RequireAuth />}>
              <Route path="/welcome" element={<Welcome />}></Route>
              <Route exact path='/grocerystore' element={<GroceryStore user={user} />}></Route>
              <Route exact path='/shoppinglist' element={<ShoppingList user={user} />}></Route>
              <Route exact path='/cupboard' element={<Cupboard user={user} />}></Route>
            </Route>
            <Route exact path='/logout' element={<Logout />}></Route>
            
        </Routes>
      </MDBContainer>
    </Router>
    </div>
    </AuthProvider>
  );
}

export default App
