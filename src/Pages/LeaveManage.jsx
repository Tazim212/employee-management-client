import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const LeaveManage = () => {
    const axiosSecure = useAxiosSecure()

    const {data: leaves = [] } = useQuery({
        queryKey: ["leaves"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leave")
            return res.data;
        }
    })
    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Leave Management</h1>
                    <p>Manage leave types, applications and approval workflow.</p>
                </div>
                <div className="space-x-3">
                    <Link to="/dashboard/module_attendence/leave_form" className="btn btn-soft btn-primary">Apply Leave</Link>
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
                                    <td><div className="badge badge-accent">{leave.status}</div></td>
                                    
                                    <td>
                                        <button type="button" className="btn btn-success">Review</button>
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