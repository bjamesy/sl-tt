import { useForm } from 'react-hook-form'

const StudentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const postStudent = async (data) => {
    const response  = await fetch(`http://127.0.0.1:5000/students`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
    if (!response.ok) throw new Error('Failed to post student data')
  }

  return (
    <form onSubmit={handleSubmit(postStudent)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="familyName">Family Name:</label>
        <input
          type="text"
          id="familyName"
          {...register('familyName', { required: true })}
        />
        {errors.familyName && <span>This field is required</span>}
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
