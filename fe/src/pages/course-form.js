"use client"
import { useForm } from 'react-hook-form'
import { NEXT_PUBLIC_API_URL } from process.env

const CourseForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  const postCourse = async(data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    }
    const response  = await fetch(`${NEXT_PUBLIC_API_URL}/courses`, options)
    if (!response.ok) throw new Error('Failed to post course data')
    
    reset()
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
