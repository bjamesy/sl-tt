"use client"
import { useEffect, useState } from "react"

const { NEXT_PUBLIC_API_URL } = process.env

export default function Home() {
  const [data, setData] = useState([])
  const [url, setUrl] = useState([])

  useEffect(() => {
    (async () => {
        const response = await fetch("http://127.0.0.1:5000/students")

        const res = await response.json()

        setData(res)
    })()
  }, [])

  console.log("RESULT", data)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        HOME PAGE
      </div>
    </main>
  )
}
