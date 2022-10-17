import { MDBContainer } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

const Logout = () => {
    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h2>You have been logged out</h2>
            <Link to="/login">Login</Link>
        </MDBContainer>
    )
}

export default Logout;