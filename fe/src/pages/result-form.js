"use client"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { NEXT_PUBLIC_API_URL } from process.env

const ResultForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    (async () => {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/students`)
        if (!response.ok) throw new Error('Failed to fetch student data')

        const data = await response.json()
        setStudents(data)
    })()
  }, [])

  useEffect(() => {
    (async () => {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/courses`)
        if (!response.ok) {
          throw new Error('Failed to fetch course data')
        }
        const data = await response.json()
        setCourses(data)
    })()
  }, [])

  const postResult = async(data) => {
    const response  = await fetch(`${NEXT_PUBLIC_API_URL}/results`,{
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to post course data')

    reset()
  }

  return (
    <form onSubmit={handleSubmit(postResult)}>
      <h3>Add Result</h3>
      <div>
        <label htmlFor="course">Course</label>
        <select
          id="course"
          {...register('course', { required: true })}
        >
          <option value="" selected disabled hidden>Choose here</option>
          { courses.map(course => <option key={course[1]} value={course[1]}>{course[0]}</option> )}
        </select>
        {errors.course && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="student">Student</label>
        <select
          id="student"
          {...register('student', { required: true })}
        >
          <option value="" selected disabled hidden>Choose here</option>
          { students.map(student => <option key={student[3]} value={student[3]}>{student[0] + student[1]}</option> )}
        </select>
        {errors.student && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="score">Score:</label>
        <select
          id="score"
          {...register('score', { required: true })}
        >
          <option value="" selected disabled hidden>Choose here</option>
          <option key="A" value="A">A</option>
          <option key="B" value="B">B</option>
          <option key="C" value="C">C</option>
          <option key="D" value="D">D</option>
          <option key="E" value="E">E</option>
          <option key="F" value="F">F</option>
        </select>
        {errors.score && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResultForm
