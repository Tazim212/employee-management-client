import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
    const { handleSubmit, register } = useForm()
    const [show, SetShow] = useState(false)

    const handleLogin = (data) => {
        console.log(data)
    }
    return (
        <div className="bg-amber-800 opacity-70">
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="hero min-h-screen">
                    <div className="card bg-cyan-600 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-3xl text-center py-2 font-bold italic">Login now!</h1>
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" {...register("email")} />
                                <label className="label">Password</label>
                                <input
                                    type={show ? "text" : "password"}
                                    className="input"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button type="submit" className="btn btn-info btn-outline text-lg mt-4">Login</button>
                                {
                                    show ? <span type="button" className="relative bottom-29 left-75 cursor-pointer" onClick={() => SetShow(false)}><FaEyeSlash></FaEyeSlash></span>
                                        :
                                        <span type="button" className="relative bottom-29 left-75 cursor-pointer" onClick={() => SetShow(true)}><FaEye></FaEye></span>
                                }

                                <span className="text-md font-semibold">Don't have an accoutn? <Link to="/register" className="underline text-blue-800">Register</Link> Now</span>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;