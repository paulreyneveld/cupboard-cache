import { MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ShoppingList = ({ user }) => {
    
    const [groceryList, setGroceryList] = useState(null)
    
    useEffect(() => {
        const userId = user.userId
        console.log(userId)
        const req = { userId }
        axios.post('http://localhost:4999/grocery_list', req)
        .then((data) => {
            console.log(data.data)
            setGroceryList(data.data)
        })
        .catch(err => console.log(err))
    }, [])

    const purchaseItem = (item) => {
        // On add, I just need to pass this item to my backend server to add it to the user's information. 
        const new_item = {
            userId: user.userId,
            itemId: item._id,
            name: item.name,
            cost: item.cost
        }
        axios.post('http://localhost:4999/purchase_item', new_item)
            .then((res) => {
                console.log('data', res.data)
                setGroceryList(res.data)
            })
            .catch((err) => console.log(err))
    }

    const deleteItem = (item) => {
        console.log(item)
        const req = {
            userId: user.userId,
            itemId: item._id
        }
        axios.post('http://localhost:4999/delete_item', req)
        .then(res => {
            setGroceryList(res.data)
            console.log(res)
        })
        .catch(err => console.log(err))
    }
    
    if (!groceryList) {
        return (
            <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
            <MDBCardBody className='p-5 text-center'>
                <p>Loading. . .</p>
            </MDBCardBody>
            </MDBCard>
        )
    }
    return (
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center'>
            <p>Here is your Grocery List!</p>
            <table className="table">
                <thead>
                 <tr>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Add Item</th>
                    <th>Remove Item</th>
                    </tr>
                </thead>
                <tbody>
                {groceryList.map(item => (
                    <tr key={item._id}>
                        <td >{item.name}</td>
                        <td>{item.cost}</td>
                        <td>
                        <MDBBtn 
                            className='w-100 mb-4' 
                            size='md'
                            intent="primary"
                            type="submit"
                            onClick={() => purchaseItem(item)}
                        >
                        Purchase Item
                        </MDBBtn>
                        </td>
                        <td>
                        <MDBBtn 
                            className='w-100 mb-4' 
                            size='md'
                            intent="primary"
                            type="submit"
                            onClick={() => deleteItem(item)}
                        >
                        Delete Item
                        </MDBBtn>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </MDBCardBody>
        </MDBCard>
    )
}

export default ShoppingList