import { FaCcAmazonPay } from "react-icons/fa";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { MdBrandingWatermark } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link, Outlet } from "react-router";

const DashboardModule = () => {
    const text = "React word animation dekhun";
    const words = text.split(" ");

    return (
        <div>
            <h2 className="text-4xl font-bold text-center pt-10">Welcome To The IFT Industris</h2>
            <div className="flex justify-center mt-30 items-center gap-10">
                <Link to="/dashboard/module_admin" className="btn btn-outline bg-success h-15"><span className="text-4xl"><RiAdminFill /></span>Admin</Link>
                <Link to="/dashboard/module_hr" className="btn btn-outline bg-success h-15"><span className="text-4xl"><FaPersonCircleCheck /></span>HR</Link>
                <Link to="/dashboard/module_payroll" className="btn btn-outline bg-success h-15"><span className="text-4xl"><FaCcAmazonPay /></span>Payroll</Link>
                <Link to="/dashboard/module_attendence" className="btn btn-outline bg-success h-15"><span className="text-4xl"><MdBrandingWatermark /></span>Attendent</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}
export default DashboardModule;