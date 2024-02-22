import { useEffect, useState } from 'react'

const ResultList = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    // Fetch student data from an API endpoint or provide sample data
    (async () => {
        // Replace the URL with your actual API endpoint
        const response = await fetch('http://127.0.0.1:5000/results')
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setResults(data)
    })()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => (
          <tr key={i}>
            <td>{result.student}</td>
            <td>{result.coures}</td>
            <td>{result.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ResultList
