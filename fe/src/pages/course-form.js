"use client"
import { useForm } from 'react-hook-form'

const CourseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const postCourse = async(data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    }
    const response  = await fetch(`http://127.0.0.1:5000/courses`, options)
    if (!response.ok) throw new Error('Failed to post course data')
  }
  const postStudent = async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    }
    const response  = await fetch(`http://127.0.0.1:5000/students`, options)
    if (!response.ok) throw new Error('Failed to post student data')
  }


  return (
    <form onSubmit={handleSubmit(postCourse)}>
      <h3>Add Course</h3>
      <div>
        <label htmlFor="name">Course Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CourseForm
