import { createBrowserRouter } from "react-router"
import Login from "../Login/Login"
import Home from "../../Pages/Home"
import Register from "../Register/Register"

const DashboardRouter = createBrowserRouter(
    [
        {
            path: "/",
            Component: Login,
        },
        {
            path: 'register',
            Component: Register
        }
    ])
export default DashboardRouter;