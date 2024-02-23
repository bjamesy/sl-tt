import { useForm } from 'react-hook-form'

const StudentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const postResult = async(data) => {
    const response  = await fetch(`http://127.0.0.1:5000/results`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
    if (!response.ok) throw new Error('Failed to post course data')
  }

  return (
    <form onSubmit={handleSubmit(postResult)}>
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
