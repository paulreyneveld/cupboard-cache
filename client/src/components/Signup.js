import { useState} from 'react'
import axios from 'axios'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput
}
from 'mdb-react-ui-kit'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () =>  {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useAuth()
  
  const navigate = useNavigate()

  const formSubmitHandler = e => {
    e.preventDefault()
    const payload = {
      firstName,
      lastName,
      username,
      password
    }
    axios.post('http://localhost:4999/signup', payload)
      .then(res => {
          return setProfile(res.data.data)

      })
      .catch(error => console.log(error))
  }

  const setProfile = user => {
    console.log(user)
    user = JSON.stringify(user)
    setUser(user)
    localStorage.setItem("user", user)
    navigate('/welcome')
  }

  return (
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
          <h2 className="fw-bold mb-5">Sign Up Now</h2>
          <form onSubmit={formSubmitHandler} id="form1">
          <MDBRow>
            <MDBCol col='6'>
              <MDBInput 
                wrapperClass='mb-4' 
                label='First name' 
                type='text' 
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
              />
            </MDBCol>

            <MDBCol col='6'>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Last name' 
                type='text' 
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              />
            </MDBCol>
          </MDBRow>

          <MDBInput 
            wrapperClass='mb-4'  
            label='User Name' 
            type='username' 
            onChange={e => setUsername(e.target.value)}
            value={username}
          />

          <MDBInput 
            wrapperClass='mb-4' 
            label='Password' 
            type='password' 
            onChange={e => setPassword(e.target.value)}
            value={password}
          />

          <MDBBtn 
            className='w-100 mb-4' 
            size='md'
            intent="primary"
            type="submit"
            >sign up</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
  );
}

export default Signup