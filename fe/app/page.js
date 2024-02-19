import { useEffect, useState } from "react"

const { BASE_API_URL } = process.env

export default async function Home() {
  const [data, setData] = useState([])
  const [url, setUrl] = useState([])
  const [postUrl, setPostUrl] = useState([])

  const get = useEffect(async (url) => {
    const response = await fetch(BASE_API_URL + url)
    data = await response.json()

    setData(data)
  }, [url])

  const post = useEffect(async (postUrl) => {
    const response = await fetch(BASE_API_URL + postUrl, method="POST")
    data = await response.json()

    setData(data)
  }, [postUrl])

  console.log("RESULT", students)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        HOME PAGE
      </div>
    </main>
  );
}
