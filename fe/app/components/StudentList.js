import { useEffect, useState } from 'react'

const StudentList = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    (async () => {
        const response = await fetch('http://127.0.0.1:5000/students')
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setStudents(data)
    })()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.dob}</td>
            <td>{student.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentList
