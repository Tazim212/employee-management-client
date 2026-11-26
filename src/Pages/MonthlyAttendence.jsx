import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { useState } from "react";

const MonthlyAttendence = () => {
    const axiosSecure = useAxiosSecure()
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })
    const employee = employees.result || []

    const { data: monthlyRepo = [] } = useQuery({
        queryKey: ["monthly_att", month],
        queryFn: async () => {
            const res = await axiosSecure.get(`/monthly_report?month=${month}`)
            return res.data
        }
    })
    return (
        <div>
            <div className="space-x-4 mx-6 my-5">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mx-0 md:mx-12">
                <div>
                    <h2 className="text-xl font-bold">Monthly Attendence</h2>
                    <p>Total working days, present and absent</p>
                </div>
                <input type="text" placeholder="Type here" className="input w-60" />
            </div>

            <div className="overflow-x-auto my-6">
                <table className="table w-280 mx-auto">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            {/* <th>#</th> */}
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Working Days</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Late</th>
                            <th>On Leave</th>
                            <th>Total Work Hours</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            monthlyRepo.map((repo, i) =>
                                <tr key={repo.employee_id}>
                                    <td>{repo.employee_id}</td>
                                    <td>{repo.employee_name}</td>
                                    <td>{repo.workingDays}</td>
                                    <td className="text-green-600">{repo.present}</td>
                                    <td className="text-red-600">{repo.absent}</td>
                                    <td className="text-amber-600">{repo.late}</td>
                                    <td className="text-fuchsia-600">{repo.leave}</td>
                                    <td>{repo.totalHours}</td>
                                    <td className="space-x-2 flex">
                                        <button className="btn btn-outline btn-success" title="Correct">Correct</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
export default MonthlyAttendence;