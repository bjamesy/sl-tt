"use client"
import { useEffect, useState } from "react"

const { BASE_API_URL } = process.env

export default function Home() {
  const [data, setData] = useState([])
  const [url, setUrl] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(BASE_API_URL + "/students", {
            mode: 'no-cors',
        })

        setData(response)
    }

    fetchData()
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