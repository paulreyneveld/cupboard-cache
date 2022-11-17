import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
  }
from 'mdb-react-ui-kit'

const Welcome = () => {

    const [user, setUser] = useAuth()
    const navigate = useNavigate()

    const logout = () => {
      localStorage.removeItem("user")
      console.log(localStorage)
      setUser(null)
      navigate('/logout')
    }
    
    return (
        <div>
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
            <h3>Welcome to Cupboard Cache</h3>
            <p>What would you like to do?</p>
            <p><Link to="/grocerystore">See what's for sale</Link></p>
            <p><Link to="/shoppinglist">See what's on your shopping list</Link></p>
            <p><Link to="/cupboard">Check your cupboard</Link></p>

            <MDBBtn className='w-100 mb-4' size='md' onClick={logout}>Logout</MDBBtn>
        </MDBCardBody>
        </MDBCard>
        </div>
    )
    

}

export default Welcome