import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router"
import useAuth from "../../Hooks/useAuth"

const Register = () => {
    const { handleRegister } = useAuth()
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [show, SetShow] = useState(false)

    const handleCreateUser = (data) => {
        handleRegister(data.email, data.password)
            .then(res => {
                console.log(res.user)
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <form onSubmit={handleSubmit(handleCreateUser)}>
            <div className="hero bg-linear-to-r from-blue-300 to-emerald-700 opacity-70 min-h-screen">
                <div className="card bg-mauve-700 text-gray-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center py-2 font-bold">Register now!</h1>
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

                            <span className="text-md font-semibold">Already have an account? <Link to="/login" className="text-blue-500">Going</Link> Now</span>
                            <p className="text-red-300 text-sm py-2 text-center">{error}</p>
                        </fieldset>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Register;