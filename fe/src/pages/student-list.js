"use client"
import { useEffect, useState } from 'react'
import { NEXT_PUBLIC_API_URL } from process.env

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [isUpdated, setIsUpdated] = useState()

  useEffect(() => {
    (async () => {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/students`)
        if (!response.ok) throw new Error('Failed to fetch student data')

        const data = await response.json()
        setStudents(data)
    })()
  }, [isUpdated])

  const deleteStudent = async(id) => {
    const options = { method: "DELETE" }
    const response  = await fetch(`${NEXT_PUBLIC_API_URL}/students/${id}`, options)
    if (!response.ok) throw new Error('Failed to delete student data')

    setIsUpdated(!isUpdated)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={i}>
              <td>{student[0]}</td>
              <td>{student[1]}</td>
              <td>{student[5]}</td>
              <td>{student[2]}</td>
              <td><button onClick={() => deleteStudent(student[3])}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
