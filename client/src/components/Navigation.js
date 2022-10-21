import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';

const Navigation = () => {

    return (
    <>
    <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
    <MDBCardBody className='p-5 text-center'>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Cupboard Cache</MDBNavbarBrand>
          <MDBNavbarNav>
            <MDBNavbarLink><Link to="/">Home</Link></MDBNavbarLink>
            <MDBNavbarLink><Link to="/signup">Sign Up</Link></MDBNavbarLink>
            <MDBNavbarLink><Link to="/login">Login</Link></MDBNavbarLink>
            <MDBNavbarLink><Link to="/logout">Logout</Link></MDBNavbarLink>
          </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
    </MDBCardBody>
    </MDBCard>
      </>
    )
}

export default Navigation