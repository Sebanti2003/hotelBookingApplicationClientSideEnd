import React from 'react'
import { Button } from "@/components/ui/button"
import { NavLink, useNavigation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setlogin } from '@/store/slices/userslice.slice'
import { IoMan } from "react-icons/io5";
function Header() {
  const dispatch=useDispatch()
  const signout=async()=>{
    try {
      const signingout=await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/v1/user/logout`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data=await signingout.json()
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
    const user=useSelector(state=>state.user)
    console.log("user: ",user);
    
  return (
    <div className='bg-blue-800 py-6 '>
      <div className="container w-[90%] md:w-[60%] flex items-center justify-between">
        <NavLink to={"/search"} className='text-white font-bold text-2xl'>MernHolidays.com</NavLink>
        {user.isauthenticated?<div className='flex items-center gap-3'>
          <Button className='text-white font-bold text-lg' variant={"link"}>My Booking</Button>
          <Button variant={"link"} className='capitalize text-white font-bold text-lg'>My hotels</Button>
          <div><Button onClick={signout} className='bg-white text-blue-600 hover:bg-black hover:text-white font-bold  transition-all duration-200'>Sign out</Button></div>
        </div>:<NavLink to={`/signin`}><Button className='bg-white text-blue-600 hover:bg-black hover:text-white   transition-all duration-500'>Sign In</Button></NavLink>}
      </div>
    </div>
  )
}

export default Header

