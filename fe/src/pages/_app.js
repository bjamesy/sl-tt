"use client"
import Link from 'next/link' 

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <h1>Student Results Management</h1>
      <div><Link href="/">Home</Link></div>
      <div><Link href="/student-form">Add New Student</Link></div>  
      <div><Link href="/student-list">Students List</Link></div>
      <div><Link href="/course-form">Add New Courses</Link></div>
      <div><Link href="/course-list">Courses List</Link></div>
      <div><Link href="/result-form">Add New Results</Link></div>
      <div><Link href="/result-list">Results List</Link></div>
      <Component {...pageProps}/>
    </div>
  )
}

export default MyApp