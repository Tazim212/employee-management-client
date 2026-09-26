import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { FaEye, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const Employees = () => {
    const axiosSecure = useAxiosSecure()

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })
    return (
        <div>
            <Helmet>
                <title>Dashboard | Employee List</title>
            </Helmet>

            <div className="flex justify-between items-center ps-4 py-2">
                <h1 className="text-2xl font-bold">Employee List</h1>

                <Link to="/dashboard/empl_form"><button className="btn btn-info">New Employee</button></Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-11/12vw">
                    <thead className="bg-emerald-700 text-gray-100">
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Joining Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((emp) =>
                                <tr key={emp.employee_id}>
                                    <th>{emp.employee_id}</th>
                                    <td>{emp.employee_name}</td>
                                    <td>{emp.employee_department}</td>
                                    <td>{emp.employee_designation}</td>
                                    <td>{emp.employee_joined_date}</td>
                                    <td className="flex gap-2">
                                        <Link><span><FaEye></FaEye></span></Link>
                                        <Link><span><FiEdit></FiEdit></span></Link>
                                        <Link><span><FaTrash></FaTrash></span></Link>
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
export default Employees;