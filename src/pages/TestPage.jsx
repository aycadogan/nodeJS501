import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TestPage = () => {
    const [testData, setTestData] = useState('')

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
            // console.log(res.data)
            setTestData(res.data.title)
        }
        getData()
    }, [])

  return (
    <div>
        <h1>{testData}</h1>
    </div>
  )
}

export default TestPage