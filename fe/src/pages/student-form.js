"use client"
import { useForm } from 'react-hook-form'

const StudentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const postStudent = async(data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    }
    const response  = await fetch(`http://127.0.0.1:5000/students`, options)
    if (!response.ok) throw new Error('Failed to post student data')
  }

  return (
    <form onSubmit={handleSubmit(postStudent)}>
      <h3>Add Student</h3>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          {...register('first_name', { required: true })}
        />
        {errors.first_name && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="last_name">Family Name:</label>
        <input
          type="text"
          id="last_name"
          {...register('last_name', { required: true })}
        />
        {errors.last_name && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          {...register('dob', { required: true })}
        />
        {errors.dob && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default StudentForm
