import { Navigate, useLocation } from "react-router"
import useAuth from "../../Hooks/useAuth"

const PrivateRoute = ({children}) =>{
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <span className="loading loading-dots loading-xl flex justify-center items-center mt-30"></span>
    }
    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    else {
        return children
    }
}
export default PrivateRoute;