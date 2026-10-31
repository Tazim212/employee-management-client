import { useForm } from "react-hook-form"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import DatePicker from "react-datepicker"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const PromotionForm = () => {
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [pay, setPay] = useState([])

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    const handleEmplPromotion = (data) => {
        const emplPromotion = {
            employee_id: data.employee_id,
            employee_name: data.employee_name,
            current_department: data.current_department,
            current_designation: data.current_designation,
            new_department: data.new_department,
            new_designation: data.new_designation,
            promotion_date: selectedDate.toISOString().split("T")[0],
            effective_date: selectedDate.toISOString().split("T")[0],
            remarks: data.remarks
        }
        axiosSecure.post("/promotion", emplPromotion)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Promotion has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const handleInfo = (id) => {
        console.log(id)
        axiosSecure.get(`/empl_payroll/${id}`)
        .then(res =>{
            setPay(res.data)
        })
    }

    console.log(pay)
    return (
        <div>
            <form onSubmit={handleSubmit(handleEmplPromotion)} >

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
                                    },
                                })}
                            />
                            {errors?.employee_id && <span className="text-red-600 text-md">ID must be 5 digits</span>}

                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee Name</label>
                            <select className="select select-ghost" {...register("employee_name")}>
                                <option value="Select Employee">Select Employee</option>
                                {
                                    employees?.map(empl => <option onClick={() => handleInfo(empl._id)} key={empl._id}>{empl.employee_name}</option>)
                                }
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Current Department</label>
                            <select className="select" {...register("current_department")}>
                                <option value='Select Department'>Select Department</option>
                                <option value="Admin & HR">Admin & HR</option>
                                <option value="IT">IT</option>
                                <option value="Accounts">Accounts</option>
                                <option value="Audit">Audit</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Current Designation</label>
                            <select className="select" {...register("current_designation")}>
                                <option value='Select Designation'>Select Designation</option>
                                <option>Chief Executive</option>
                                <option>Deputy Executive</option>
                                <option>Director</option>
                                <option>Deputy Director</option>
                                <option>Program Manager</option>
                                <option>Manager</option>
                                <option>Junior Officer</option>
                                <option>Senior Officer</option>
                                <option>Assistant Manager</option>
                                <option>Senior IT Officer</option>
                                <option>Junior IT Officer</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">New Department</label>
                            <select className="select" {...register("new_department")}>
                                <option value='Select Department'>Select Department</option>
                                <option value="Admin & HR">Admin & HR</option>
                                <option value="IT">IT</option>
                                <option value="Accounts">Accounts</option>
                                <option value="Audit">Audit</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">New Designation</label>
                            <select className="select" {...register("new_designation")}>
                                <option value='Select Designation'>Select Designation</option>
                                <option>Chief Executive</option>
                                <option>Deputy Executive</option>
                                <option>Director</option>
                                <option>Deputy Director</option>
                                <option>Program Manager</option>
                                <option>Manager</option>
                                <option>Junior Officer</option>
                                <option>Senior Officer</option>
                                <option>Assistant Manager</option>
                                <option>Senior IT Officer</option>
                                <option>Junior IT Officer</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Promotion Date</label>
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
                            <label className="label">Effective Date</label>
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
export default PromotionForm