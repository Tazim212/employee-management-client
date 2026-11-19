import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const LeaveForm = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    const handleAddleave = async (data) => {
        let imageUrl = "";

        if (data.attachment && data.attachment.length > 0) {
            const formData = new FormData();
            formData.append("image", data.attachment[0]);

            const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_EMP_IMG_KEY}`;
            const imgRes = await axios.post(image_api_url, formData);
            imageUrl = imgRes.data.data.url;
        }
        const leaves = {
            employee_id: data.employee_id,
            employee_name: data.employee_name,
            employee_designation: data.employee_designation,
            employee_department: data.employee_department,
            leaveType: data.leaveType,
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
            totalDays: Number(data.totalDays),
            emergencyContact: data.emergencyContact,
            handoverTo: data.handoverTo,
            attachment: imageUrl,
            reason: data.reason
        }
        axiosSecure.post("/leave", leaves)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Leave Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mx-8 my-2 bg-gray-300 p-3 rounded-2xl">Leave Form</h2>
            <form onSubmit={handleSubmit(handleAddleave)} className="space-y-6 w-285 p-4 mx-auto my-3 bg-gray-100 rounded-2xl opacity-75">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="form-control w-full space-y-1">
                        <label className="label">
                            <span className="label-text font-medium">Employee ID</span>
                        </label>
                        <input
                            type="number"
                            step="0.5"
                            className="input input-bordered w-full bg-base-200 font-semibold"
                            {...register("employee_id")}
                        />
                    </div>
                    <div className="form-control w-full space-y-1">
                        <label className="label">
                            <span className="label-text font-medium">Employee Name</span>
                        </label>
                        <select defaultValue="Select Department" className="select flex w-full" {...register("employee_name")}>
                            <option value="select employee">Select Employee</option>
                            {
                                employees.map(empl =>
                                    <option key={empl._id}>{empl.employee_id}-{empl.employee_name}</option>
                                )
                            }

                        </select>
                    </div>

                    <div className="form-control space-y-1">
                        <label className="label">
                            <span className="label-text font-medium">Employee Department</span>
                        </label>
                        <select defaultValue="Select Department" className="select" {...register("employee_department")}>
                            <option disabled={true}>Select Department</option>
                            <option>Admin & HR</option>
                            <option>IT</option>
                            <option>Accounts</option>
                            <option>Audit</option>
                        </select>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div className="form-control w-full space-y-1">
                        <label className="label">
                            <span className="label-text font-medium">Employee Designation</span>
                        </label>
                        <select defaultValue="Select Designation" className="select flex gap-1" {...register("employee_designation")}>
                            <option disabled={true}>Select Designation</option>
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

                    <div className="form-control space-y-1">
                        <label className="label">
                            <p className="label-text font-medium">Leave Type <span className="text-red-500">*</span></p>
                        </label>
                        <select
                            className="select select-bordered w-2/3 flex"
                            {...register("leaveType")}
                        >
                            <option>Select leave type</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Maternity/Paternity Leave">Maternity / Paternity Leave</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="label">
                            <p className="label-text font-medium">Start Date <span className="text-red-500">*</span></p>
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat="dd/MM/yyyy"
                            className="input input-bordered w-80"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="label">
                            <p className="label-text font-medium">End Date <span className="text-red-500">*</span></p>
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat="dd/MM/yyyy"
                            className="input input-bordered w-80"
                        />
                    </div>

                    <div className="form-control w-full space-y-1">
                        <label className="label">
                            <span className="label-text font-medium">Total Days</span>
                        </label>
                        <input
                            type="text"
                            step="0.5"
                            className="input input-bordered w-full bg-base-200 font-semibold"
                            {...register("totalDays")}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-1">
                    <div className="form-control w-full space-y-1">
                        <label className="label">
                            <p className="label-text font-medium">Emergency Contact <span className="text-red-500">*</span></p>
                        </label>
                        <input
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            className="input input-bordered w-full"
                            {...register("emergencyContact")}
                        />

                    </div>

                    <div className="form-control w-full space-y-1">
                        <label className="label">
                            <span className="label-text font-medium">Task Handover To (Optional)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Colleague Name or ID"
                            className="input input-bordered w-full"
                            {...register("handoverTo")}
                        />
                    </div>
                </div>

                <div className="form-control w-full space-y-1">
                    <label className="label">
                        <span className="label-text font-medium">Attachment (Medical/Other Doc)</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("attachment")}
                    />
                </div>

                <div className="form-control w-full space-y-1">
                    <label className="label">
                        <p className="label-text font-medium">Reason for Leave <span className="text-red-500">*</span></p>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="Write your reason briefly..."
                        {...register("reason")}
                    ></textarea>
                </div>

                <div className="pt-2 space-x-2">
                    <button type="submit" className="btn btn-success text-gray-100">
                        Submit Leave Application
                    </button>
                    <Link to="/dashboard/module_attendence/leave_manage"><button type="button" className="btn btn-error btn-soft">
                        Cancel
                    </button></Link>
                </div>
            </form>
        </div >
    )
}
export default LeaveForm;