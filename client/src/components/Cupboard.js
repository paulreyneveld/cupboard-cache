import { MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Cupboard = ({ user }) => {

    const [cupboard, setCupboard] = useState(null)

    useEffect(() => {
        const userId = user.userId
        console.log(userId)
        const req = { userId }
        axios.post('http://localhost:4999/cupboard', req)
        .then((data) => {
            console.log(data.data)
            setCupboard(data.data)
        })
        .catch(err => console.log(err))
    }, [])

    const deleteItem = (item) => {
        console.log('id', item._id)
        const req = {
            userId: user.userId,
            itemId: item._id
        }
        axios.post('http://localhost:4999/delete_item_cupboard', req)
        .then(res => {
            setCupboard(res.data)
            console.log(res)
        })
        .catch(err => console.log(err))    
    }

    if (!cupboard) {
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
            <p>Here is what you have at home!</p>
            <table className="table">
                <thead>
                 <tr>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Remove from Cupboard</th>
                    </tr>
                </thead>
                <tbody>
                {cupboard.map(item => (
                    <tr key={item._id}>
                        <td >{item.name}</td>
                        <td>{item.cost}</td>
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

export default Cupboard