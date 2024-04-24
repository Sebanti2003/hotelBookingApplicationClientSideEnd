
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
function ProtectedRoutes() {
    const user=useSelector(state=>state.user)
  return (
    <div>
      {user.isauthenticated?<Outlet/>:<Navigate to="/signin"/>}
    </div>
  )
}

export default ProtectedRoutes
