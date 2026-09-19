import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-sdk";


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleRegister = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        handleRegister
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}
export default AuthProvider;