import axios from 'axios'
import { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit'
import { useAuth } from '../context/AuthContext'

const GroceryStore = ({ user }) => {

    const [groceries, setGroceries] = useState(null)

    useEffect( () => {
        axios.get('http://localhost:5001/groceries')
        .then((data) => {
            console.log(user.userId)
            console.log(data.data)
            setGroceries(data.data)
        })
        .catch(err => console.log(err))
    }, [])

    console.log(user)

    const addToShoppingList = (item) => {

        // On add, I just need to pass this item to my backend server to add it to the user's information. 
        const new_item = {
            userId: user.userId,
            name: item.name,
            cost: item.cost
        }
        axios.post('http://localhost:4999/add_item', new_item)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    if (!groceries) {
        return (
            <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
            <MDBCardBody className='p-5 text-center'>
                <p>Loading. . .</p>
            </MDBCardBody>
            </MDBCard>
        )
    }

    return (
        <>
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
            <p>Here you'll find what we have for sale! To make a shopping list, simply press add and those items will magically 
                appear in the Shopping List view
            </p>
            <table className="table">
                <thead>
                 <tr>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Add Item</th>
                    </tr>
                </thead>
                <tbody>
                {groceries.map(item => (
                    <tr key={item._id}>
                        <td >{item.name}</td>
                        <td>{item.cost}</td>
                        <td>
                        <MDBBtn 
                            className='w-100 mb-4' 
                            size='md'
                            intent="primary"
                            type="submit"
                            onClick={() => addToShoppingList(item)}
                        >
                        Add to Grocery List
                        </MDBBtn>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

        </MDBCardBody>
        </MDBCard>
        </>
    )
}

export default GroceryStore