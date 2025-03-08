import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
export default function Home() {
  const router = useRouter();
  const [parseUser, setParseUser] = useState(null)
  const [userImg, setUserImg] = useState("/user-img.png")
  const fileInputRef = useRef(null)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)[0]
        setParseUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
        router.push("/login")
      }
    } else {
      router.push("/login");
    }
    const storedImg = localStorage.getItem("userImg");
    if (storedImg) setUserImg(storedImg)
  }, [router])
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userImg", reader.result)
        setUserImg(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      <Head>
        <title>Todo list</title>
        <link rel="icon" type="image/png" href="/login-img.svg" />
      </Head>
      <div className="bg-[#F9FCF5] w-full min-h-screen px-5 py-5">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col items-start gap-y-3">
            <div className="bg-[#F5F2E8] w-[70px] h-[70px] rounded-full overflow-hidden relative cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <img src={userImg} alt="user img"/>
              <input ref={fileInputRef} onChange={handleChangeImg} type="file" className="hidden"/>
            </div>
            <p className="bg-[#F5F2E8] px-1 py-[2px] rounded-[4px] font-rubik font-normal text-[16px] leading-[100%] text-[#444444]">
              Good evening, {parseUser ? parseUser.username.charAt(0).toUpperCase() + parseUser.username.slice(1) : "User"}
            </p>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </div>
    </>
  )
}