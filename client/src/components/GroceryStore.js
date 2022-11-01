import axios from 'axios'
import { useEffect, useState } from 'react'


const GroceryStore = () => {

    const [groceries, setGroceries] = useState(null)

    useEffect( () => {
        axios.get('http://localhost:5001/groceries')
        .then((data) => {
            console.log(data.data)
            setGroceries(data.data)
        })
        .catch(err => console.log(err))
    }, [])

    const viewGroceries = () => {
            groceries.map((item, i) => {
                return (<p>{item.cost}</p>)
            })
    }
    return (
        <>
        {groceries ? viewGroceries() : <p>Loading. . .</p>}
        </>
    )
}

export default GroceryStore