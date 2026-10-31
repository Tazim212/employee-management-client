import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Dashboard = () => {
    const axiosInstance = useAxios()
    const [states, setStates] = useState([])

    useEffect(() => {
        axiosInstance.get("/employee-stats")
            .then(res => {
                setStates(res.data)
            })
    }, [])

    return (
        <div className="mb-40">
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-3xl font-bold">Total Employees</div>
                    <div className="stat-value">{states[0]?.total}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-3xl font-bold">Total Departments</div>
                    <div className="stat-value">4</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-3xl font-bold">Total Attendent</div>
                    <div className="stat-value">1,200</div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;