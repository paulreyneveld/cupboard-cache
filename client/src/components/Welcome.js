import { useCallback, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Loader from './Loader'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody
  }
from 'mdb-react-ui-kit'

const Welcome = () => {
    const [userContext, setUserContext] = useContext(UserContext)

    const fetchUserDetails = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
          method: "GET",
          credentials: "include",
          // Pass authentication token as bearer token in header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }).then(async response => {
          if (response.ok) {
            const data = await response.json()
            setUserContext(oldValues => {
              return { ...oldValues, details: data }
            })
          } else {
            if (response.status === 401) {
              window.location.reload()
            } else {
              setUserContext(oldValues => {
                return { ...oldValues, details: null }
              })
            }
          }
        })
      }, [setUserContext, userContext.token])

    useEffect(() => {
        if (!userContext.details) {
          fetchUserDetails()
        }
      }, [userContext.details, fetchUserDetails])
    
      const refetchHandler = () => {
        setUserContext(oldValues => {
          return { ...oldValues, details: undefined }
        })
      }

      const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }).then(async response => {
          setUserContext(oldValues => {
            return { ...oldValues, details: undefined, token: null }
          })
          window.localStorage.setItem("logout", Date.now())
        })
      }

    return userContext.details === null ? 
    
    (
        "Error loading details"
    ) : !userContext.details ? (
        <Loader />
    ) : (
        <div>
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
            Welcome <br />
            {userContext.details.firstName} {userContext.details.lastName}
            <MDBBtn className='w-100 mb-4' size='md' onClick={logoutHandler}>Logout</MDBBtn>
        </MDBCardBody>
        </MDBCard>
        </div>
    )
    

}

export default Welcome