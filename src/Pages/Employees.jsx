import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router";
import { FaEye, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const Employees = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: employees = [], refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    const handleDeleteEmpl = empl_id => {

        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure you want to delete ID : ${empl_id}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/empl/${empl_id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        }

        );

        }
         const handleEdit = (empl_id) => {
            Swal.fire({
                title: `Do you want to edit ID: ${empl_id}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Edit"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/dashboard//empl_edit/${empl_id}`)
                }
            });
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Employee List</title>
            </Helmet>

            <div className="flex justify-between items-center p-2 bg-gray-300 rounded-xl ms-6 w-11/12">
                <h1 className="text-xl font-bold">Employee List</h1>

                <Link to="/dashboard/empl_form"><button className="btn btn-info rounnded-2xl">New Employee</button></Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-11/12 mx-6 my-3">
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

                                        <Link to={`/dashboard/empl/${emp.employee_id}`}><span><FaEye></FaEye></span></Link>
                                        <button onClick={() =>handleEdit(emp.employee_id)} className="cursor-pointer text-green-700"><FiEdit></FiEdit></button>
                                        <span onClick={() => handleDeleteEmpl(emp.employee_id)} className="cursor-pointer text-red-600"><FaTrash></FaTrash></span>
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