"use client"
import { useEffect, useState } from 'react'

const ResultList = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    // Fetch student data from an API endpoint or provide sample data
    (async () => {
        // Replace the URL with your actual API endpoint
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
            <td>{result[1]}</td>
            <td>{result[2]}</td>
            <td>{result[3]}</td>
            <td><button onClick={deleteResult(result[0])}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ResultList
