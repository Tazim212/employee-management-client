import { Navigate } from "react-router";
import useRole from "../../Hooks/useRole"

const AdminRoute = ({children}) =>{
    const {role, isLoading} = useRole();
    if(isLoading){
        return <h2>Loadinggg......</h2>
    }

    if(role !== "admin"){
        <Navigate to="/login"></Navigate>
    }
    return children
}
export default AdminRoute;