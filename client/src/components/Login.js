import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
    MDBInput,
    MDBBtn,
    MDBCardBody,
    MDBCard
  }
from 'mdb-react-ui-kit'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Login = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userContext, setUserContext] = useContext(UserContext)

    // const formSubmitHandler = e => {
    //   e.preventDefault()
    //   setIsSubmitting(true)
    //   setError("")
  
    //   const genericErrorMessage = "Something went wrong! Please try again later."
  
    //   fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, password }),
    //   })
    //     .then(async response => {
    //       setIsSubmitting(false)
    //       if (!response.ok) {
    //         if (response.status === 400) {
    //           setError("Please fill all the fields correctly!")
    //         } else if (response.status === 401) {
    //           setError("Invalid email and password combination.")
    //         } else {
    //           setError(genericErrorMessage)
    //         }
    //       } else {
    //         const data = await response.json()
    //         setUserContext(oldValues => {
    //           return { ...oldValues, token: data.token }
    //         })
    //       }
    //     })
    //     .catch(error => {
    //       setIsSubmitting(false)
    //       setError(genericErrorMessage)
    //     })
    // }

    const formSubmitHandler = (e) => {
      e.preventDefault()
      const userData = {
        username, 
        password
      }
      axios
        .post("http://localhost:4000/api/auth/register_login", userData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    return (
      <>
      {/* { userContext.token === null ? (
          <Home />)
         : userContext.token ? (
          <Welcome/>
        ) : (<Loader /> )} */}
    
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
            disabled={isSubmitting}
            text={`${isSubmitting ? "Signing In" : "Sign In"}`}
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