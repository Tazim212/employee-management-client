import { Link, Outlet, useNavigate } from "react-router"
import useAuth from "../../Hooks/useAuth"
import Footer from "../Footer/Footer"

const AdminSidebar = () =>{
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

    return(
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
                                <Link to="/dashboard/module_payroll/payroll_dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payroll Dashoboard">
                                    <span className="is-drawer-close:hidden">Payroll Dashoboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_payroll/payroll" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Salary Structure">
                                    <span className="is-drawer-close:hidden">Salary Structure</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/module_payroll/salary_process" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Salary Processing">
                                    <span className="is-drawer-close:hidden">Salary Processing</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_payroll/monthly_pay" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Monthly Payroll">
                                    <span className="is-drawer-close:hidden">Monthly Payroll</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/module_payroll/bonus" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Bonus & Deductions">
                                    <span className="is-drawer-close:hidden">Bonus & Deductions</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/module_payroll/pay_history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payroll History & Reports">
                                    <span className="is-drawer-close:hidden">Payroll History & Reports</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminSidebar;