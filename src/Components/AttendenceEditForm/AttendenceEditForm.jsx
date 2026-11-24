import { useForm } from "react-hook-form"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import DatePicker from "react-datepicker"
import { useQuery } from "@tanstack/react-query"
import { RiSafariFill } from "react-icons/ri"
import Swal from "sweetalert2"

const AttendenceEditForm = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register, formState: { errors }, reset } = useForm()
    const [editDate, setEditDate] = useState(new Date())
    const navigate = useNavigate()

    const { data: attendance = [], isLoading } = useQuery({
        queryKey: ["attendence", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/attendence/${id}`)
            return res.data
        }
    })

    useEffect(() => {
        if (attendance?.attend_date) {
            setEditDate(new Date(attendance.attend_date))
        }
        if (attendance?._id || attendance?.employee_id) {
            reset({
                employee_id: attendance.employee_id,
                employee_name: attendance.employee_name,
                check_in: attendance.check_in,
                check_out: attendance.check_out,
                status: attendance.status,
                reason: attendance.reason,
            })
        }
    }, [attendance, reset])

    const handleAttEdit = data => {
        const done = { data }
        axiosSecure.patch(`/attendence/${id}`, done)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Leave Request ${status} Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/dashboard/module_attendence/attendence")
                }
            })
    }

    if (isLoading) {
        return <h2 className="font-semibold text-xl flex justify-center items-center h-full">Loadingg.....</h2>
    }
    // console.log(attendance)
    return (
        <div>
            <div className="flex justify-between items-center my-4 mx-6 bg-gray-200 p-2.5 rounded-2xl">
                <h1 className="text-xl font-bold">Attendence Correction Form</h1>
            </div>
            <form onSubmit={handleSubmit(handleAttEdit)} >

                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee ID</label>
                            <input
                                type="text"
                                maxLength={5}
                                className="input"
                                placeholder="Employee Id"
                                readOnly
                                {...register("employee_id")}
                            />
                            {errors?.employee_id && <span className="text-red-600 text-md">ID must be 5 digits</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee Name</label>
                            <input
                                type="text"
                                maxLength={5}
                                className="input"
                                placeholder="Employee Id"
                                readOnly
                                {...register("employee_name")}
                            />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label className="label">Date</label>
                            <DatePicker
                                selected={editDate}
                                onChange={setEditDate}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                                className="input input-bordered w-80"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Check In</label>
                            <input type="time" className="input" {...register("check_in")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Check Out</label>
                            <input type="time" className="input" {...register("check_out")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Status</label>
                            <select className="select" {...register("status")}>
                                <option value='Select Department'>Select</option>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Late">Late</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Reason</label>
                            <textarea placeholder="Reason" className="textarea textarea-accent" {...register("reason")}></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info m-2 flex justify-end">Update Attendence</button>

                </div>
            </form>
        </div>
    )
}
export default AttendenceEditForm;