import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import { MDBContainer } from 'mdb-react-ui-kit';

const App = () =>  {
  return (
    <Router>
        <MDBContainer fluid>

        <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        <Routes>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/signup' element={< Signup />}></Route>
            <Route exact path='/logout' element={< Logout />}></Route>

        </Routes>
      </div>
      </MDBContainer>
    </Router>
  );
}

export default App;
