import { createBrowserRouter } from "react-router"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Employees from "../../Pages/Employees"
import Attendance from "../../Pages/Attendance"
import Dashboard from "../../Pages/Dashboard"
import EmployeeForm from "../EmployeeForm/EmployeeForm"
import EmployeeProfile from "../../Pages/EmployeeProfile"
import EmployeeEdit from "../EmployeeEdit/EmployeeEdit"
import Payroll from "../../Pages/Payroll"
import Recruitment from "../../Pages/Recruitment"
import Performance from "../../Pages/Performance"
import Settings from "../../Pages/Settings"
import PayrollForm from "../PayrollForm/PayrollForm"
import PayrollEditForm from "../PayrollEditForm/PayrollEditForm"
import DashboardModule from "../DashboardModule/DashboardModule"
import Navbar from "../Navbar/Navbar"
import Confirmation from "../../Pages/Confirmation"
import Promotion from "../../Pages/Promotion"
import PromotionForm from "../PromotionForm/PromotionForm"
import PayrollSidebar from "../PayrollSidebar/PayrollSidebar"
import PayrollDashboard from "../../Pages/PayrollDashboard"
import AdminSidebar from "../AdminSidebar/AdminSidebar"
import AdminDashboard from "../../Pages/AdminDashboard"

const DashboardRouter = createBrowserRouter(
    [
        {
            path: "/",
            Component: Login,
        },
        {
            path: "/login",
            Component: Login,
        },
        {
            path: "/dashboard",
            children: [
                {
                    path: "/dashboard/module_admin",
                    Component: AdminSidebar,
                    children: [
                        {
                            index: true,
                            Component: AdminDashboard
                        },
                        
                    ]
                },
                {
                    index: true,
                    Component: DashboardModule,
                },
                {
                    path: "/dashboard/module_hr",
                    Component: Navbar,
                    children: [
                        {
                            index: true,
                            Component: Dashboard
                        },
                        {
                            path: "/dashboard/module_hr/employees",
                            Component: Employees
                        },
                        {
                            path: "/dashboard/module_hr/new_empl",
                            Component: EmployeeForm
                        },
                        {
                            path: "/dashboard/module_hr/empl/:empl_id",
                            Component: EmployeeEdit
                        },
                        {
                            path: "/dashboard/module_hr/empl_prof/:empl_id",
                            Component: EmployeeProfile
                        },
                        {
                            path: "/dashboard/module_hr/empl_confirm",
                            Component: Confirmation
                        },
                        {
                            path: "/dashboard/module_hr/empl_promotion",
                            Component: Promotion
                        },
                        {
                            path: "/dashboard/module_hr/promo_form",
                            Component: PromotionForm
                        },
                    ]
                },
                {
                    path: "/dashboard/module_payroll",
                    Component: PayrollSidebar,
                    children: [
                        {
                            index: true,
                            Component: PayrollDashboard
                        },
                        {
                            path: "/dashboard/module_payroll/payroll",
                            Component: Payroll
                        },
                        {
                            path: "/dashboard/module_payroll/payroll_form",
                            Component: PayrollForm
                        },
                    ]
                }
            ]
        },
        {
            path: 'register',
            Component: Register
        }
    ])
export default DashboardRouter;
