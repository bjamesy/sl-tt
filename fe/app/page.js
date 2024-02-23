"use client"
import { useEffect, useState } from "react"
import StudentForm from './components/StudentForm'
import CourseForm from './components/CourseForm'
import ResultForm from './components/ResultForm'

import StudentList from './components/StudentList'
import CourseList from './components/CourseList'
import ResultList from './components/ResultList'

import Navbar from './components/Navbar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Navbar/>
        {/* <StudentForm/>
        <CourseForm/>
        <ResultForm/> */}
        {/* <CourseList/>
        <ResultList/> */}
      </div>
      <StudentList/>
    </main>
  )
}
