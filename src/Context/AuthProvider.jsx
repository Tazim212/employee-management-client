import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase-sdk";
import useAxios from "../Hooks/useAxios";


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosInstance = useAxios()

    const handleRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleSigned = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleSignOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const loggedUser = { email: currentUser?.email }
            if (loggedUser) {
                axiosInstance.post("/getToken", loggedUser)
                    .then(res => {
                        // console.log(res.data.token)
                        localStorage.setItem("token", res.data.token)
                        setUser(currentUser)
                    })
            }
            else {
                localStorage.removeItem("token")
                setUser(null)
            }
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        handleRegister,
        handleSigned,
        user,
        loading,
        handleSignOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}
export default AuthProvider;