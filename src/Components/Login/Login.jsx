import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { handleSubmit, register } = useForm()
    const [show, SetShow] = useState(false)

    const handleLogin = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-3xl text-center py-2 font-bold">Login now!</h1>
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
                                <button type="submit" className="btn btn-neutral mt-4">Login</button>
                                {
                                    show ? <span type="button" className="relative bottom-29 left-75 cursor-pointer" onClick={() =>SetShow(false)}><FaEyeSlash></FaEyeSlash></span>
                                    :
                                    <span type="button" className="relative bottom-29 left-75 cursor-pointer" onClick={() =>SetShow(true)}><FaEye></FaEye></span>
                                }
                                
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;