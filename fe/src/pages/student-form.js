"use client"
import { useForm } from 'react-hook-form'
import { NEXT_PUBLIC_API_URL } from process.env

const StudentForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  
  const validateDate = (value) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 10;
  }

  const postStudent = async(data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    }
    const response  = await fetch(`${NEXT_PUBLIC_API_URL}/students`, options)
    if (!response.ok) throw new Error('Failed to post student data')

    reset()
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
          {...register('dob', { required: true, validate: validateDate })}
        />
        {errors?.dob?.type === "required" && <span>This field is required</span>}
        {errors?.dob?.type === "validate" && <p>Invalid date, minimum age is 10</p>}
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
