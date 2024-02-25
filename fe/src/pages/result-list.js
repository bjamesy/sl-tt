"use client"
import { useEffect, useState } from 'react'
import { NEXT_PUBLIC_API_URL } from process.env

const ResultList = () => {
  const [results, setResults] = useState([])
  const [isUpdated, setIsUpdated] = useState()

  useEffect(() => {
    (async () => {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/results`)
        if (!response.ok) {
            throw new Error('Failed to fetch result data')
        }
        const data = await response.json()
        setResults(data)
    })()
  }, [isUpdated])

  const deleteResult = async(id) => {
    const response  = await fetch(`${NEXT_PUBLIC_API_URL}/results/${id}`,{
        method: "DELETE"
    })
    if (!response.ok) throw new Error('Failed to delete result data')

    setIsUpdated(!isUpdated)
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
            <td>{result[4] + result[5]}</td>
            <td>{result[10]}</td>
            <td>{result[0]}</td>
            <td><button onClick={() => deleteResult(result[1])}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ResultList
