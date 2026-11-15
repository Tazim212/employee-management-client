import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

const AttendenceForm = () => {
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [attendences, setAttendences] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const navigate = useNavigate()

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    const handleEmpAttend = data => {
        const attend = {
            employee_id: data.employee_id,
            employee_name: data.employee_name,
            attend_date: selectedDate.toISOString().split("T")[0],
            check_in: data.check_in,
            check_out: data.check_out,
            status: data.status,
            remarks: data.remarks
        }
        axiosSecure.post("/daily_attend", attend)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Attendent Added Successfully")
                    navigate("/dashboard/module_attendence/attendence")
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleEmpAttend)} >

                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee ID</label>
                            <input
                                type="text"
                                maxLength={5}
                                className="input"
                                placeholder="Employee Id"
                                {...register("employee_id", {
                                    pattern: {
                                        value: /^\d{5}$/,
                                        message: "ID must be exactly 5 digits",
                                    }
                                })}
                            />
                            {errors?.employee_id && <span className="text-red-600 text-md">ID must be 5 digits</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee Name</label>
                            <select className="select" {...register("employee_name")}>
                                <option value="Select Employee">Select Employee</option>
                                {
                                    employees?.map(empl => <option key={empl._id}>{empl.employee_name}</option>)
                                }
                            </select>
                        </div>


                        <div className="flex flex-col gap-2">
                            <label className="label">Date</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={setSelectedDate}
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
                            <label className="label">Remarks</label>
                            <textarea placeholder="Remarks" className="textarea textarea-accent" {...register("remarks")}></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info m-2 flex justify-end">Submit</button>

                </div>
            </form>
        </div>
    )
}
export default AttendenceForm;