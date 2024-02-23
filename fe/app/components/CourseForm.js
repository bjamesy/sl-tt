import { useForm } from 'react-hook-form'

const ResultForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const postCourse = async(data) => {
    const response  = await fetch(`http://127.0.0.1:5000/courses`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
    if (!response.ok) throw new Error('Failed to post course data')
  }

  return (
    <form onSubmit={handleSubmit(postCourse)}>
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

export default ResultForm
