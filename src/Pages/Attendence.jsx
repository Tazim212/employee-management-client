import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Attendence = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const axiosSecure = useAxiosSecure()

    const { data: attendance = [], isLoading } = useQuery({
        queryKey: ["attendence"],
        queryFn: async () => {
            const res = await axiosSecure.get("/attendence")
            return res.data
        }
    })

    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Daily Attendence</h1>
                    <p>Track employee check-in, check-out and daily attendance status.</p>
                </div>
                <div className="space-x-3">
                    <Link to="/dashboard/module_attendence/attendence_form"><button className="btn btn-soft btn-warning">Add Employee Attendence</button></Link>
                    <Link to="/dashboard/module_attendence/attendence_form"><button className="btn btn-soft btn-warning text-md"><MdOutlineFileDownload /> Export</button></Link>
                </div>
            </div>

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

            <div className="flex justify-around items-center">
                <h2>Employee Attendence</h2>
                <div className="space-x-5 flex">
                    <input type="text" placeholder="Type here" className="input w-60" />
                    <div>
                        <DatePicker showIcon selected={selectedDate} onChange={setSelectedDate} className="border-2 w-40 rounded-4xl" />
                    </div>
                    <select defaultValue="Pick a color" className="select w-40">
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                        <option>On Leave</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto mt-3">
                <table className="table w-280 mx-auto">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Shift</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Working Hours</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendance.map((att, i) =>
                                <tr key={att._id}>
                                    <td>{i + 1}</td>
                                    <td>{att.employee_id}-{att.employee_name}</td>
                                    <td>{att.shift}</td>
                                    <td>{att.check_in}</td>
                                    <td>{att.check_out}</td>
                                    <td>{att.check_out - att.check_in}</td>
                                    <td>
                                        <div className="badge badge-neutral">{att.status}</div>
                                    </td>
                                    <td className="space-x-2 flex">
                                        <Link><button className="btn btn-outline btn-success" title="Correct">Correct</button></Link>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Attendence;