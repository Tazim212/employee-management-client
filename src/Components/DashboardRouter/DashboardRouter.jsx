import { createBrowserRouter } from "react-router"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Employees from "../../Pages/Employees"
import Attendance from "../../Pages/Attendance"
import Dashboard from "../../Pages/Dashboard"
import EmployeeForm from "../EmployeeForm/EmployeeForm"
import EmployeeProfile from "../../Pages/EmployeeProfile"
import EmployeeEdit from "../EmployeeEdit/EmployeeEdit"
import Home from "../../Pages/Home"
import Payroll from "../../Pages/Payroll"
import Recruitment from "../../Pages/Recruitment"
import Performance from "../../Pages/Performance"
import Settings from "../../Pages/Settings"
import PayrollForm from "../PayrollForm/PayrollForm"

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
            Component: Home,
            children: [
                {
                    path: "/dashboard",
                    Component: Dashboard
                },
                {
                    path: "/dashboard/employees",
                    Component: Employees
                },
                  {
                    path: "/dashboard/empl_form",
                    Component: EmployeeForm
                },
                {
                    path: "/dashboard/attendance",
                    Component: Attendance
                },
                {
                    path: "/dashboard//empl/:empl_id",
                    Component: EmployeeProfile
                },
                {
                    path: "/dashboard/empl_edit/:empl_id",
                    Component: EmployeeEdit
                },
                {
                    path: "/dashboard/payroll",
                    Component: Payroll
                },
                {
                    path: "/dashboard/payroll_form",
                    Component: PayrollForm
                },
                {
                    path: "/dashboard/recruitment",
                    Component: Recruitment
                },
                {
                    path: "/dashboard/performance",
                    Component: Performance
                },
                {
                    path: "/dashboard/settings",
                    Component: Settings
                },
              
            ]
        },

        {
            path: 'register',
            Component: Register
        }
    ])
export default DashboardRouter;