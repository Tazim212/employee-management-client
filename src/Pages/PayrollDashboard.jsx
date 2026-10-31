import { useEffect, useState } from "react"
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { TbCoinTaka } from "react-icons/tb"

const PayrollDashboard = () => {
    const axiosSecure = useAxiosSecure()
    const [employees, setEmployees] = useState([])
    const [stat, setStat] = useState([])

    useEffect(() => {
        axiosSecure.get('/employees')
            .then(res => {
                setEmployees(res.data)
            })
    }, [])

    useEffect(() => {
        axiosSecure.get("/payroll_stat")
            .then(res => {
                setStat(res.data)
            })
    }, [])


    return (
        <div>
            <div className="my-3 space-x-9">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Total Employees</div>
                        <div className="stat-value font-semibold flex items-center gap-1">{employees.length}</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Total Payroll Cost</div>
                        <div className="stat-value font-semibold flex items-center gap-1"><span><TbCoinTaka /> </span>{stat[0]?.total[0]?.total}</div>
                        <div className="stat-desc pb-1 text-black">21% more than last month</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Employee Paid</div>
                        <div className="stat-value">{stat[0]?.paid?.length}</div>
                        <div className="stat-desc pb-1 text-black">of total {employees.length} employees</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Pending</div>
                        <div className="stat-value">{stat[0]?.pending?.length}</div>
                        <div className="stat-desc pb-1 text-black">21% more than last month</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>
                
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Processing</div>
                        <div className="stat-value">{stat[0]?.processing?.length}</div>
                        <div className="stat-desc pb-1 text-black">Being Verified</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PayrollDashboard;