import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody
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
            Welcome {user.username} <br />
            <MDBBtn className='w-100 mb-4' size='md' onClick={logout}>Logout</MDBBtn>
        </MDBCardBody>
        </MDBCard>
        </div>
    )
    

}

export default Welcome