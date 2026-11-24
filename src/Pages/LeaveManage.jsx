import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCalendar, FaLink, FaRegClock } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

const LeaveManage = () => {
    const axiosSecure = useAxiosSecure()

    const { data: leaves = [], refetch } = useQuery({
        queryKey: ["leaves"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leave")
            return res.data;
        }
    })

    const handleUpdateStatus = (status, id) => {
        // console.log(status, id)
        const updtStatus = { status }
        axiosSecure.patch(`/leave/${id}`, updtStatus)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Leave Request ${status} Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const { data: leaveStat = [], refetch: statFetch } = useQuery({
        queryKey: ['leaveStat'],
        refetchInterval: 1000,
        queryFn: async () => {
            const res = await axiosSecure.get("/leave_stat")
            return res.data
        }
    })

    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2.5 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Leave Management</h1>
                    <p>Manage leave types, applications and approval workflow.</p>
                </div>
                <div className="space-x-3">
                    <Link to="/dashboard/module_attendence/leave_form" className="btn btn-soft btn-primary">Apply Leave</Link>
                </div>
            </div>

            {/* dynamic leave stat  */}

            <div className="flex items-center gap-4 mx-6 my-5">

                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 w-1/4">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2 font-bold">On Leave Today <span className="bg-gray-100 text-purple-700 w-10 p-3 rounded-xl"><FaLink /></span></div>
                        <div className="stat-value flex items-center">{leaveStat[0]?.leaveToday}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 w-1/4">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2 font-bold">Pending Requests <span className="p-3 bg-purple-100 rounded-xl"><FaRegClock /></span></div>
                        <div className="stat-value">{leaveStat[0]?.pendings}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 w-1/4">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2 font-bold">Approved This Month <span className="p-3 bg-amber-100 rounded-xl"><IoCheckmark /></span></div>
                        <div className="stat-value">{leaveStat[0]?.thisMonth}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 w-1/4">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2 font-bold">Total Employees <span className="p-3 bg-sky-100 rounded-xl"><FaCalendar></FaCalendar></span></div>
                        <div className="stat-value">14.5</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>

            {/* fixed leave stat  */}

            <div className="flex items-center gap-2 mx-0 md:mx-5.5 my-6">
                <div className="stats bg-cyan-700 shadow opacity-70 w-1/4">
                    <div className="stat space-y-2">
                        <span className="bg-gray-100 text-purple-700 w-10 p-3 rounded-xl"><FaLink /></span>
                        <div className="stat-title text-gray-100 text-xl font-bold">Casual Leave</div>
                        <div className="text-lg text-amber-400 font-bold">3 days</div>
                        <div className="stat-desc text-gray-100">21% more than last month</div>
                    </div>
                </div>

                <div className="stats bg-cyan-700 shadow opacity-70 w-1/4">
                    <div className="stat space-y-2">
                        <span className="bg-gray-100 text-purple-700 w-10 p-3 rounded-xl"><FaLink /></span>
                        <div className="stat-title text-gray-100 text-xl font-bold">Sick Leave</div>
                        <div className="text-lg text-amber-400 font-bold">15 days</div>
                        <div className="stat-desc text-gray-100">21% more than last month</div>
                    </div>
                </div>

                <div className="stats bg-cyan-700 shadow opacity-70 w-1/4">
                    <div className="stat space-y-2">
                        <span className="bg-gray-100 text-purple-700 w-10 p-3 rounded-xl"><FaLink /></span>
                        <div className="stat-title text-gray-100 text-xl font-bold">Annual Leave</div>
                        <div className="text-lg text-amber-400 font-bold">3 days</div>
                        <div className="stat-desc text-gray-100">21% more than last month</div>
                    </div>
                </div>

                <div className="stats bg-cyan-700 shadow opacity-70 w-1/4">
                    <div className="stat space-y-2">
                        <span className="bg-gray-100 text-purple-700 w-10 p-3 rounded-xl"><FaLink /></span>
                        <div className="stat-title text-gray-100 text-xl font-bold">Maternity Leave</div>
                        <div className="text-lg text-amber-400 font-bold">112 days</div>
                        <div className="stat-desc text-gray-100">21% more than last month</div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto space-y-4 bg-gray-100 m-6 py-3 rounded-3xl">
                <div className="flex justify-between items-center mx-0 md:mx-6">
                    <div>
                        <h2 className="text-xl font-bold">Leave Applications</h2>
                        <p>Approve or reject employee requests</p>
                    </div>
                    <input type="text" placeholder="Type here" className="input w-60" />
                </div>
                <table className="table max-w-280 mx-4">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Days</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaves.map((leave) =>
                                <tr key={leave._id}>
                                    <td>{leave.employee_id}</td>
                                    <td>{leave.employee_name}</td>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td>{leave.totalDays}</td>
                                    <td><div className="badge badge-outline badge-accent">{leave.status}</div></td>

                                    <td className="space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => handleUpdateStatus("Accepted", leave._id)}
                                            className="btn btn-outline btn-success">
                                            Accept
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleUpdateStatus("Rejected", leave._id)}
                                            className="btn btn-outline btn-error mt-1 md:mt-1.5">
                                            Reject
                                        </button>
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
export default LeaveManage;