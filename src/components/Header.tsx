import React from 'react'
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setlogin } from '@/store/slices/userslice.slice'
import { IoMan } from "react-icons/io5";
function Header() {
    const user=useSelector(state=>state.user)
    console.log("user: ",user);
    
  return (
    <div className='bg-blue-800 py-6 '>
      <div className="container w-[90%] md:w-[60%] flex items-center justify-between">
        <NavLink to={"/search"} className='text-white font-bold text-2xl'>MernHolidays.com</NavLink>
        {user.isauthenticated?<div className='text-white text-lg flex items-center gap-1'><div className="w-8 h-8 rounded-full overflow-hidden"><img src={user.avatar} className='w-full h-full' alt="" /></div>{user.email}</div>:<NavLink to={`/signin`}><Button className='bg-white text-blue-600 hover:bg-black hover:text-white   transition-all duration-500'>Sign In</Button></NavLink>}
      </div>
    </div>
  )
}

export default Header

