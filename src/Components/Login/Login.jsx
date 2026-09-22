import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
    const { handleSubmit, register } = useForm()
    const [show, SetShow] = useState(false)
    const [error, setError] = useState("")
    const { handleSigned } = useAuth()

    const handleLogin = (data) => {
        handleSigned(data.email, data.password)
        .then(res =>{
            console.log(res.user)
        })
        .catch(err =>{
            setError(err.message)
        })
    }

    return (
        <div className="bg-linear-to-r from-blue-300 to-emerald-700 opacity-70">
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="hero min-h-screen">
                    <div className="card bg-mauve-700 w-full max-w-sm shrink-0 shadow-2xl hover:translate-1">
                        <h1 className="text-3xl text-center py-2 text-gray-100 font-bold italic">Login now!</h1>
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label text-gray-100">Email</label>
                                <input type="email" className="input" placeholder="Email" {...register("email")} />
                                <label className="label text-gray-100">Password</label>
                                <input
                                    type={show ? "text" : "password"}
                                    className="input"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                <div><a className="link link-hover text-gray-100">Forgot password?</a></div>
                                <button type="submit" className="btn btn-info btn-outline text-lg mt-4">Login</button>
                                {
                                    show ? <span type="button" className="relative bottom-29 left-75 cursor-pointer" onClick={() => SetShow(false)}><FaEyeSlash></FaEyeSlash></span>
                                        :
                                        <span type="button" className="relative bottom-29 left-75 cursor-pointer" onClick={() => SetShow(true)}><FaEye></FaEye></span>
                                }

                                <span className="text-md font-semibold text-gray-100">Don't have an accoutn? <Link to="/register" className="underline text-blue-400">Register</Link> Now</span>
                                <p className="text-red-300 text-sm py-2 text-center">{error}</p>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;