import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const Dashboard = () =>{
    return(
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    )
}
export default Dashboard;