import { useState, useContext } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput
}
from 'mdb-react-ui-kit'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const Signup = () =>  {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userContext, setUserContext] = useContext(UserContext)

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, password }),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
          } else if (response.status === 500) {
            console.log(response)
            const data = await response.json()
            if (data.message) setError(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await response.json()
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
        }
        return <Navigate replate to='/login' />
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
  }

  return (
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
          <h2 className="fw-bold mb-5">Sign Up Now</h2>
          <form onSubmit={formSubmitHandler}>
          <MDBRow>
            <MDBCol col='6'>
              <MDBInput 
                wrapperClass='mb-4' 
                label='First name' 
                id='form1' type='text' 
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
              />
            </MDBCol>

            <MDBCol col='6'>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Last name' 
                id='form1' 
                type='text' 
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              />
            </MDBCol>
          </MDBRow>

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
            id='form1' 
            type='password' 
            onChange={e => setPassword(e.target.value)}
            value={password}
          />

          <MDBBtn 
            className='w-100 mb-4' 
            size='md'
            intent="primary"
            disabled={isSubmitting}
            text={`${isSubmitting ? "Registering" : "Register"}`}
            fill
            type="submit"
            >sign up</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
  );
}

export default Signup