import { useForm } from 'react-hook-form'

const StudentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Here you can handle form submission, e.g., send data to server, etc.
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          type="date"
          id="student"
          {...register('student', { required: true })}
        />
        {errors.dob && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="score">Score:</label>
        <input
          type="score"
          id="score"
          {...register('score', { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default StudentForm
