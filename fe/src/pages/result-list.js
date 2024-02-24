"use client"
import { useEffect, useState } from 'react'

const ResultList = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    (async () => {
        const response = await fetch('http://127.0.0.1:5000/results')
        if (!response.ok) {
            throw new Error('Failed to fetch result data')
        }
        const data = await response.json()
        setResults(data)
    })()
  }, [])

  const deleteResult = async(id) => {
    const response  = await fetch(`http://127.0.0.1:5000/results/${id}`,{
        method: "DELETE"
    })
    if (!response.ok) throw new Error('Failed to delete result data')
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Score</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => (
          <tr key={i}>
            <td>{result[0]}</td>
            <td>{result[1]}</td>
            <td>{result[2]}</td>
            <td><button onClick={() => deleteResult(result[3])}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ResultList
