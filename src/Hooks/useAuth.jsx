import { use } from "react";
import AuthContext from "../Context/AuthContext"

const useAuth = () =>{
    const authCon = use(AuthContext)
    return authCon;
}
export default useAuth;