import { useEffect, useState } from 'react'

const StudentList = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    (async () => {
        const response = await fetch('http://127.0.0.1:5000/students')
        if (!response.ok) throw new Error('Failed to fetch student data')

        const data = await response.json()
        console.log("STUDENTS",  data)
        setStudents(data)
    })()
  }, [])


  const deleteStudent = async(id) => {
    const response  = await fetch(`http://127.0.0.1:5000/students/${id}`)
    if (!response.ok) throw new Error('Failed to delete student data')
  }

  return (
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
            <td>{student[1]}</td>
            <td>{student[2]}</td>
            <td>{student[3]}</td>
            <td>{student[4]}</td>
            <td><button onClick={deleteStudent(student[0])}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentList
