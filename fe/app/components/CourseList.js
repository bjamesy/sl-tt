import { useEffect, useState } from 'react'

const CourseTable = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    (async () => {
        const response = await fetch('http://127.0.0.1:5000/courses')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setCourses(data)
    })()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, i) => (
          <tr key={i}>
            <td>{course.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CourseTable
