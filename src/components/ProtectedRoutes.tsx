
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { RootState } from '@/store/store'
function ProtectedRoutes() {
    const user=useSelector((state:RootState)=>state.user)
  return (
    <div>
      {user.isauthenticated?<Outlet/>:<Navigate to="/signin"/>}
    </div>
  )
}

export default ProtectedRoutes
