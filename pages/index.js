import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io"
import { RiEditBoxLine } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import { MdCheck } from "react-icons/md";
export default function Home() {
  const [list, setList] = useState([{
    time: "08:00",
    work: "Reding book",
    done: true,
    id: Math.floor(Math.random()*9999),
  },
  {
    time: "08:00",
    work: "Reding book",
    done: true,
    id: Math.floor(Math.random()*9999),
  },
  {
    time: "08:00",
    work: "Reding book",
    done: true,
    id: Math.floor(Math.random()*9999),
  },
  {
    time: "08:00",
    work: "Reding book",
    done: true,
    id: Math.floor(Math.random()*9999),
  },
  {
    time: "08:00",
    work: "Reding book",
    done: true,
    id: Math.floor(Math.random()*9999),
  },
  {
    time: "08:00",
    work: "Reding book",
    done: true,
    id: Math.floor(Math.random()*9999),
  },])
  const [date, setDate] = useState(new Date())
  const router = useRouter();
  const [parseUser, setParseUser] = useState(null)
  const [userImg, setUserImg] = useState("/user-img.png")
  const fileInputRef = useRef(null)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)[0]
        setParseUser(user)
      } catch (error) {
        localStorage.removeItem("user")
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
    const storedImg = localStorage.getItem("userImg");
    if (storedImg) setUserImg(storedImg)
  }, [router])
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("user", reader.result)
        setUserImg(reader.result)
      }
      reader.readAsDataURL(file);
    }
  }
  const deleteFunction = (id) => {
    const remList = list.filter((item)=>{
      return item.id !== id
    }) 
    setList(remList)
  }
  return (
    <>
      <Head>
        <title>Todo list</title>
        <link rel="icon" type="image/png" href="/login-img.svg" />
      </Head>
      <div className="bg-[#F9FCF5] w-full min-h-screen px-5 pt-5 relative">
        <div className="flex flex-col gap-y-7">
          <div className="flex flex-col items-start gap-y-4">
            <div className="bg-[#F5F2E8] w-[70px] h-[70px] rounded-full overflow-hidden relative cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <img src={userImg} alt="user img" className="w-full h-full bg-center object-cover" />
              <input ref={fileInputRef} onChange={handleChangeImg} type="file" className="hidden" />
            </div>
            <p className="bg-[#F5F2E8] px-1 py-[2px] rounded-[4px] font-rubik font-normal text-[16px] leading-[100%] text-[#444444]">
              Good evening, {parseUser ? parseUser.username.charAt(0).toUpperCase() + parseUser.username.slice(1) : "User"}
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              {
                Array(7).fill(null).map((_, key) => {
                  return (
                    <div key={key} className="flex flex-col items-center gap-y-2">
                      <button className="bg-[#DFBD43] w-7 h-7 rounded-full font-rubik font-normal text-[13px] leading-[100%] text-[#FFFFFF]">{date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}</button>
                      <p className="font-rubik font-normal text-[12px] leading-[100%] text-[#DFBD43]">{weekDays[key]}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="flex items-center gap-x-3 px-4 py-3 border border-[#999999] rounded-[60px]">
              <IoIosSearch className="text-[24px] text-[#DFBD43]" />
              <input type="text" placeholder="Search" className="bg-transparent w-full font-rubik font-normal text-[16px] leading-[100%] text-[#00000080] outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="font-rubik font-semibold text-[20px] leading-[100%] text-[#444444]">Today’s tasks</h3>
            <div style={{ scrollbarWidth: "none" }} className="max-h-[calc(100vh-332px)] flex flex-col gap-y-2 overflow-y-scroll">
              {list.map((item, key) => {
                  return (
                    <div key={key} className="flex items-center gap-x-3 px-3 py-2 border-[2px] border-[#D6D6D6] rounded-[20px]">
                      <button onClick={()=>{
                        const doneList = [...list]
                        doneList[key] = {...item, done: !item.done}
                        setList(doneList)                      
                      }} className={item.done?"w-5 h-5 border border-[#DFBD43] bg-[#DFBD43]":"w-5 h-5 border border-[#DFBD43]"}>{item.done&&<MdCheck className="text-[#FFFFFF]"/>}</button>
                      <div className="w-full flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                          <p className="font-rubik font-normal text-[13px] leading-[100%] text-[#00000080]">{item.time} AM</p>
                          <RiEditBoxLine className="text-[20px] text-[#DFBD43]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-rubik font-medium text-[16px] leading-[100%] text-[#00000080]">{item.work}</p>
                          <LuTrash2 onClick={()=>deleteFunction(item.id)} className="font-semibold text-[20px] text-[#DFBD43]" />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <button className="bg-[#DFBD43] w-10 h-10 flex items-center justify-center rounded-full font-rubik font-medium text-[30px] leading-[100%] text-[#FFFFFF] absolute right-5 bottom-14">+</button>
      </div>
    </>
  )
}