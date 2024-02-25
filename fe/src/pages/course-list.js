"use client"
import { useEffect, useState } from 'react'

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [isUpdated, setUpdated] = useState()

  useEffect(() => {
    (async () => {
        const response = await fetch('http://127.0.0.1:5000/courses')
        if (!response.ok) {
          throw new Error('Failed to fetch course data')
        }
        const data = await response.json()
        setCourses(data)
    })()
  }, [isUpdated])

  const deleteCourse = async(id) => {
    const response  = await fetch(`http://127.0.0.1:5000/courses/${id}`,{
        method: "DELETE"
    })
    if (!response.ok) throw new Error('Failed to delete course data')

    setUpdated(!isUpdated)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, i) => (
          <tr key={i}>
            <td>{course[0]}</td>
            <td><button onClick={() => deleteCourse(course[1])}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CourseList
