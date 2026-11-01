import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { MdBrandingWatermark } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

gsap.registerPlugin(SplitText);

const DashboardModule = () => {

    const textRef = useRef(null);

    const { handleSignOut } = useAuth()
    const navigate = useNavigate()

    const signedOut = () => {
        handleSignOut()
            .then(() => {
                navigate("/login")
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        const split = new SplitText(textRef.current, {
            type: "chars, words",
        });

        gsap.from(split.chars, {
            y: 100,
            opacity: 0,
            rotationX: -90,
            stagger: 0.04,
            duration: 5,
            ease: "back.out(1.7)",
        });

        return () => split.revert();
    }, []);

    return (
        <div>
            <div className="navbar bg-gray-300 px-3 shadow-sm">
                <div className="flex-1">
                    <Link to="/dashboard"><h2 className="text-3xl font-semibold">IFT Industries Ltd.</h2></Link>
                </div>
                <div className="flex-none">
                    <button onClick={signedOut} className="btn btn-info mr-3">Sign Out</button>
                </div>
            </div>

            <div className="bg-radial from-cyan-600 from-40% to-emerald-800 pb-45">
                <h2 ref={textRef} className="text-4xl font-bold mx-auto text-center pt-30 w-1/2 text-gray-200">Welcome To The IFT Industrise ERP Solution</h2>

                <div className="flex justify-center mt-12 items-center gap-10">
                    <Link to="/dashboard/module_admin" className="btn btn-outline bg-success h-15 transition delay-100 duration-150 ease-in hover:-translate-x-1 hover:scale-100">
                        <span className="text-4xl"><RiAdminFill /></span>Admin
                    </Link>
                    <Link to="/dashboard/module_hr" className="btn btn-outline bg-success h-15 transition delay-100 duration-150 ease-in hover:-translate-x-1 hover:scale-100">
                        <span className="text-4xl"><FaPersonCircleCheck /></span>HR
                    </Link>
                    <Link to="/dashboard/module_payroll" className="btn btn-outline bg-success h-15 transition delay-100 duration-150 ease-in hover:-translate-x-1 hover:scale-100">
                        <span className="text-4xl"><FaCcAmazonPay /></span>Payroll
                    </Link>
                    <Link to="/dashboard/module_attendence" className="btn btn-outline bg-success h-15 transition delay-100 duration-150 ease-in hover:-translate-x-1 hover:scale-100">
                        <span className="text-4xl"><MdBrandingWatermark /></span>Attendent
                    </Link>
                </div>
            </div >
        </div >
    )
}
export default DashboardModule;
