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
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
                <div className="drawer-content">
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <section className="flex justify-between flex-1">
                            <Link to="/dashboard"><h2 className="text-3xl font-semibold">IFT Industries Ltd.</h2></Link>
                            <button onClick={signedOut} className="btn btn-info mr-3">Sign Out</button>
                        </section>
                    </nav>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-gray-300 is-drawer-close:w-14 is-drawer-open:w-64">
                        <ul className="menu w-full grow">
                            <li>
                                <Link to="/dashboard/module_attendence" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payroll Dashoboard">
                                    <span><HiMiniSquaresPlus /></span>
                                    <span className="is-drawer-close:hidden">Attendence Dashoboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/attendence" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Daily Attendence">
                                    <span><IoCalendarOutline /></span>
                                    <span className="is-drawer-close:hidden">Daily Attendence</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/module_attendence/attend_record" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Attendence Records">
                                    <span><CiReceipt /></span>
                                    <span className="is-drawer-close:hidden">Attendence Records</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/monthly_attend" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Monthly Attendence">
                                    <span><FaCalendarDays /></span>
                                    <span className="is-drawer-close:hidden">Monthly Attendence</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/module_attendence/overtime_manage" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Overtime management">
                                    <span><FaRegClock /></span>
                                    <span className="is-drawer-close:hidden">Overtime Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/leave_manage" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Leave Management">
                                    <span><BiLeaf /></span>
                                    <span className="is-drawer-close:hidden">Leave Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/att_correction" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Attendence Correction">
                                    <span><HiArrowPathRoundedSquare /></span>
                                    <span className="is-drawer-close:hidden">Attendence Correction</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_attendence/att_report" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Attendence Reports">
                                    <span><GrBarChart /></span>
                                    <span className="is-drawer-close:hidden">Attendence Report</span>
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