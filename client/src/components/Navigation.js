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

    const logout = () => {
      localStorage.removeItem("user")
      console.log(localStorage)
      setUser(null)
      navigate('/logout')
    }

    const logoutStyle = {
      cursor: "pointer"
      
    }

    return (
    <>
    <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
    <MDBCardBody className='p-5 text-center'>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Cupboard Cache</MDBNavbarBrand>
          <MDBNavbarNav>

            {!user ? 
              <>
              <MDBNavbarLink tag={Link} to="/">Home</MDBNavbarLink>
              <MDBNavbarLink tag={Link} to="/signup">Sign Up</MDBNavbarLink> 
              <MDBNavbarLink tag={Link} to="/login">Login</MDBNavbarLink>
              </> 
              : 
              <>
              <MDBNavbarLink tag={Link} to="/welcome">Welcome</MDBNavbarLink>
              <MDBNavbarLink tag={Link} to="/grocerystore">On Sale</MDBNavbarLink>
              <MDBNavbarLink tag={Link} to="/shoppinglist">Shopping List</MDBNavbarLink>
              <MDBNavbarLink tag={Link} to="/cupboard">At Home</MDBNavbarLink>
              <MDBNavbarLink style={logoutStyle} onClick={logout}>Logout</MDBNavbarLink> 
              </>}

          </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
    </MDBCardBody>
    </MDBCard>
    </>
    )
}

export default Navigation