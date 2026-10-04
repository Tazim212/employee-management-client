import { Navigate, useLocation } from "react-router"
import useAuth from "../../Hooks/useAuth"

const PrivateRoute = ({children}) =>{
    const {user, loading} = useAuth()
    const location = useLocation()

    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    else {
        return children
    }
}
export default PrivateRoute;