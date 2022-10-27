import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { useAuth } from '../context/AuthContext'

const Navigation = () => {

    const navigate = useNavigate()
    const [user, setUser] = useAuth()
    console.log(user)

    const logout = () => {
      localStorage.removeItem("user")
      console.log(localStorage)
      setUser(null)
      navigate('/logout')
    }

    const logoutStyle = {
      color: "#1266f1"
    }

    return (
    <>
    <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
    <MDBCardBody className='p-5 text-center'>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Cupboard Cache</MDBNavbarBrand>
          <MDBNavbarNav>
            <MDBNavbarLink><Link to="/">Home</Link></MDBNavbarLink>
            
            {!user ? 
              <><MDBNavbarLink><Link to="/signup">Sign Up</Link></MDBNavbarLink> 
              <MDBNavbarLink><Link to="/login">Login</Link></MDBNavbarLink></> 
              : 
              <MDBNavbarLink style={logoutStyle} onClick={logout}>Logout</MDBNavbarLink> }

          </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
    </MDBCardBody>
    </MDBCard>
      </>
    )
}

export default Navigation