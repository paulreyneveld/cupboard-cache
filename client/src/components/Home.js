import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit'

const Home = () => { 

    const [user, setUser] = useAuth()
    console.log(user)

    return (
        <>
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>

        <p>Welcome to the Cupboard Cache app! The app that makes it easy to know what you have at home and what you need to buy! </p>
        <p>Cupboard Cache takes care of the hard part and automatically shows you what's available
        for purchase at your local store. When you create an account with Cupboard Cache, you're able to make shopping lists from that 
        store's provided inventory. You can then consult that list at the store and ultimately keep track of what you have purchased. With 
        this information you can easily keep track of what you have at home in the Cupboard (or fridge, pantry, cellar)! Isn't that neat? See 
        the link below to sign up!</p>
        <Link to="/signup">Sign Up Today</Link>
        </MDBCardBody>
        </MDBCard>
        </>
    )
}

export default Home