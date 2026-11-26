import { Link, Outlet, useNavigate } from "react-router"
import useAuth from "../../Hooks/useAuth"
import Footer from "../Footer/Footer"
import { HiArrowPathRoundedSquare, HiMiniSquaresPlus } from "react-icons/hi2"
import { FaRegClock, FaWallet } from "react-icons/fa"
import { IoCalendarOutline, IoStatsChartSharp } from "react-icons/io5"
import { CiReceipt } from "react-icons/ci"
import { FaCalendarDays } from "react-icons/fa6"
import { GrBarChart } from "react-icons/gr"
import { BiLeaf } from "react-icons/bi"

const AttendenceSidebar = () => {
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
    return (
        <div>
            <div className="drawer lg:drawer-open">
                {/* 'inline' ক্লাসটি সরিয়ে দেওয়া হয়েছে */}
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col">
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                        </label>
                        <section className="flex justify-between items-center flex-1">
                            <Link to="/dashboard"><h2 className="text-3xl font-semibold">IFT Industries Ltd.</h2></Link>
                            <button onClick={signedOut} className="btn btn-info mr-3">Sign Out</button>
                        </section>
                    </nav>
                    <Outlet />
                    <Footer />
                </div>

                {/* is-drawer-close:overflow-visible শুধুমাত্র lg স্ক্রিনের জন্য দেওয়া হয়েছে */}
                <div className="drawer-side lg:is-drawer-close:overflow-visible z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                    {/* পরিবর্তন: মোবাইলে w-64 ফিক্সড থাকবে, শুধু lg স্ক্রিনে w-14 এবং w-64 টগল হবে */}
                    <div className="flex min-h-full flex-col items-start pt-2 bg-gray-300 w-64 lg:is-drawer-close:w-14 lg:is-drawer-open:w-64 transition-all duration-200">
                        <ul className="menu w-full grow gap-1">
                            <li>
                                <Link to="/dashboard/module_attendence" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Attendance Dashboard">
                                    <span className="text-lg"><HiMiniSquaresPlus /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Attendance Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/attendence" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Daily Attendance">
                                    <span className="text-lg"><IoCalendarOutline /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Daily Attendance</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/att_record" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Attendance Records">
                                    <span className="text-lg"><CiReceipt /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Attendance Records</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/monthly_attend" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Monthly Attendance">
                                    <span className="text-lg"><FaCalendarDays /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Monthly Attendance</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/overtime_manage" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Overtime Management">
                                    <span className="text-lg"><FaRegClock /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Overtime Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/leave_manage" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Leave Management">
                                    <span className="text-lg"><BiLeaf /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Leave Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/att_correct" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Attendance Correction">
                                    <span className="text-lg"><HiArrowPathRoundedSquare /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Attendance Correction</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/att_report" className="lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right" data-tip="Attendance Reports">
                                    <span className="text-lg"><GrBarChart /></span>
                                    <span className="lg:is-drawer-close:hidden whitespace-nowrap">Attendance Report</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AttendenceSidebar;