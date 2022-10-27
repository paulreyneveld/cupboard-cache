import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    MDBInput,
    MDBBtn,
    MDBCardBody,
    MDBCard
  }
from 'mdb-react-ui-kit'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useAuth()
    const navigate = useNavigate()

    const formSubmitHandler = e => {
      e.preventDefault()
      try {
        const userData = {
          username, 
          password
        }
        axios
          .post("/login", userData)
          .then(res => {
            console.log(res.data.data)
            return setProfile(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
      catch (error) {
        console.log(error)
      }
    }

    const setProfile = user => {
      console.log(user)
      user = JSON.stringify(user)
      setUser(user)
      localStorage.setItem("user", user)
      navigate('/welcome')
    }

    return (
      <>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
        <h2 className="fw-bold mb-5">Log In</h2>

        <form onSubmit={formSubmitHandler}>
          <MDBInput 
            wrapperClass='mb-4' 
            label='User Name' 
            id='form1' 
            type='username' 
            onChange={e => setUsername(e.target.value)} 
            value={username}
          />
          <MDBInput 
            wrapperClass='mb-4' 
            label='Password' 
            id='form2' 
            type='password' 
            onChange={e => setPassword(e.target.value)} 
            value={password}
          />
    
          <MDBBtn 
            className="mb-4"
            intent="primary"
            type="submit"
            >Sign in</MDBBtn>
        </form>
    
          <div className="text-center">
            <p>Not a member? <Link to="/signup">Register</Link></p>
          </div>
          </MDBCardBody>
          </MDBCard>
          </>
      );
}

export default Login;