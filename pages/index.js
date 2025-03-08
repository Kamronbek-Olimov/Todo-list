import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter()
  const [parseUser, setParseUser] = useState(null)
  useEffect(()=>{
    const user = localStorage.getItem("user")
    setParseUser(user&&JSON.parse(user)[0])
    user??router.push("/login")
  },[])
  return (
    <>
      <Head>
        <title>Todo list</title>
        <link rel="icon" type="png" href="/login-img.svg"></link>
      </Head>
      <div>
        <p className="font-inter underline text-slate-950">Hello {parseUser?parseUser.username.slice(0,1).toUpperCase()+parseUser.username.slice(1):"User"}</p>
      </div>
    </>
  )
}