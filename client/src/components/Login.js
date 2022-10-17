import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    MDBContainer,
    MDBInput,
    MDBBtn
  }
  from 'mdb-react-ui-kit';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateName = (e) => {
        console.log(e.target.value);
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='email' onChange={updateName}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={updatePassword}/>
    
          <MDBBtn className="mb-4">Sign in</MDBBtn>
    
          <div className="text-center">
            <p>Not a member? <Link to="/signup">Register</Link></p>
          </div>
        </MDBContainer>
      );
}

export default Login;