"use client"
import { useForm } from 'react-hook-form'

const ResultForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const postResult = async(data) => {
    const response  = await fetch(`http://127.0.0.1:5000/results`,{
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to post course data')
  }

  return (
    <form onSubmit={handleSubmit(postResult)}>
      <h3>Add Result</h3>
      <div>
        <label htmlFor="course">Course name:</label>
        <input
          type="text"
          id="course"
          {...register('course', { required: true })}
        />
        {errors.familyName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="student">Student name:</label>
        <input
          type="text"
          id="student"
          {...register('student', { required: true })}
        />
        {errors.dob && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="score">Score:</label>
        <input
          type="text"
          id="score"
          {...register('score', { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResultForm
