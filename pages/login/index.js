import Head from "next/head"
import { HiOutlineUser } from "react-icons/hi2"
import { GoEye } from "react-icons/go"
import { GoEyeClosed } from "react-icons/go"
import { AiOutlineMail } from "react-icons/ai"
import { useState } from "react"
import { useRouter } from "next/router"
export default function Login() {
  const [passwordHide, setPasswordHide] = useState(false)
  const [emailHide, setEmailHide] = useState(false)
  const router = useRouter()
  const [invalid, setInvalid] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleForm = (refresh) => {
    refresh.preventDefault()
    localStorage.getItem("user") ? setInvalid(false) : setInvalid(true)    
    if (JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user"))[0].username.toLowerCase() === username.toLowerCase() &&
      JSON.parse(localStorage.getItem("user"))[0].password.toLowerCase() === password.toLowerCase()) {
      router.push("/")
    }else if(emailHide){
      localStorage.setItem("user", JSON.stringify([{username, email, password}]))
      router.push("/")
    }else{
      setInvalid(true)
    }
  }
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/login-img.svg"></link>
      </Head>
      <div className="bg-[#F0EEEE] w-full min-h-screen px-8 py-5">
        <div className="flex flex-col gap-y-10">
          <img className="w-full" src="/login-img.svg" alt="login img" />
          <form onSubmit={handleForm} className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="username" className="font-inter font-semibold text-[20px] leading-[100%] text-[#000000]">Username</label>
                <div className="flex items-center justify-between px-2 py-3 border border-[#000000B2] rounded-[8px]">
                  <input required onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" className="bg-transparent font-inter font-normal text-[16] leading-[100%] text-[#000000] outline-none" />
                  <HiOutlineUser />
                </div>
              </div>
              <div className={emailHide ? "flex flex-col gap-y-2" : "hidden flex-col gap-y-2"}>
                <label htmlFor="email" className="font-inter font-semibold text-[20px] leading-[100%] text-[#000000]">Email</label>
                <div className="flex items-center justify-between px-2 py-3 border border-[#000000B2] rounded-[8px]">
                  <input required={emailHide} onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="bg-transparent font-inter font-normal text-[16] leading-[100%] text-[#000000] outline-none" />
                  <AiOutlineMail />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="font-inter font-semibold text-[20px] leading-[100%] text-[#000000]">Password</label>
                <div className="flex items-center justify-between px-2 py-3 border border-[#000000B2] rounded-[8px]">
                  <input required onChange={(e) => setPassword(e.target.value)} value={password} type={passwordHide ? "text" : "password"} placeholder="Password" className="bg-transparent font-inter font-normal text-[16] leading-[100%] text-[#000000] outline-none" />
                  <button onClick={() => setPasswordHide(!passwordHide)} type="button">{passwordHide ? <GoEyeClosed /> : <GoEye />}</button>
                </div>
                {invalid && <span className="font-inter text-red-700 font-normal text-[16px] leading-[100%]">Invalid username or password!</span>}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <button className="bg-[#19A0EC] py-5 rounded-[8px] font-inter font-semibold text-[20px] leading-[100%] text-[#FFFFFF]">{emailHide ? "Sign Up" : "Sign In"}</button>
              <p className="font-inter text-[#000000] font-normal text-[16px] leading-[100%] text-center">Don't you have an account? <button onClick={() => {
                setEmailHide(!emailHide)
                setInvalid(false)
              }} type="button" className="text-[#19A0EC]">{emailHide ? "Sign In" : "Sign Up"}</button></p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}