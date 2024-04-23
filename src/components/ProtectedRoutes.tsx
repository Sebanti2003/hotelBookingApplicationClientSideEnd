import React from 'react'
import { Outlet,useLocation,Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
function ProtectedRoutes() {
    const user=useSelector(state=>state.user)
  return (
    <div>
      {user.isauthenticated?<Outlet/>:<Navigate to="/signin"/>}
    </div>
  )
}

export default ProtectedRoutes
