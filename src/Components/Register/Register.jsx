import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router"

const Register = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [show, SetShow] = useState(false)

    const handleLogin = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center py-2 font-bold">Login now!</h1>
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Your Email" {...register("email")} />

                            <label className="label">Phone Number</label>
                            <input
                                type="text"
                                className="input"
                                maxLength={11}
                                placeholder="Your Phone"
                                {...register("phone"), {
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "Phone Number must be 11 digits"
                                    }
                                }}
                            />
                           
                            <label className="label">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                className="input"
                                placeholder="Password"
                                {...register("password")}
                            />
                            <button type="submit" className="btn btn-neutral mt-4">Register</button>
                            {
                                show ? <span type="button" className="relative bottom-23.5 left-75 cursor-pointer" onClick={() => SetShow(false)}><FaEyeSlash></FaEyeSlash></span>
                                    :
                                    <span type="button" className="relative bottom-23.5 left-75 cursor-pointer" onClick={() => SetShow(true)}><FaEye></FaEye></span>
                            }

                            <span className="text-md font-semibold">Already have an account? <Link to="/login">Going</Link> Now</span>
                        </fieldset>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Register;