const { BASE_API_URL } = process.env

export default async function Home() {
  const getStudents = await fetch(BASE_API_URL + "/students")
  // const getCourses = await fetch(BASE_API_URL + "/courses")
  // const getResults = await fetch(BASE_API_URL + "/results")
  // const postStudents = await fetch(method="POST", BASE_API_URL + "/students")
  // const postCourses = await fetch(method="POST", BASE_API_URL + "/courses")
  // const postResults = await fetch(method="POST", BASE_API_URL + "/results")


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        HOME PAGE
      </div>
    </main>
  );
}
