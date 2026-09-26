import { createBrowserRouter } from "react-router"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Employees from "../../Pages/Employees"
import Attendance from "../../Pages/Attendance"
import Dashboard from "../../Pages/Dashboard"
import EmployeeForm from "../EmployeeForm/EmployeeForm"

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
            Component: Dashboard,
            children: [
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
              
            ]
        },

        {
            path: 'register',
            Component: Register
        }
    ])
export default DashboardRouter;