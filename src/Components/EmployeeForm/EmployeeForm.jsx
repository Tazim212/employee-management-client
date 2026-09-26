import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EmployeeForm = () => {
    const { register, handleSubmit } = useForm()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [step, setStep] = useState(1)
    const axiosSecure = useAxiosSecure()

    const handleAddEmployee = async (data) => {
        const profileImg = data.employee_photo[0];
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_EMP_IMG_KEY}`;

        const imgRes = await axios.post(image_api_url, formData);
        const imageUrl = imgRes.data.data.url;

        const newEmployee = {
            employee_id: data.employee_id,
            employee_name: data.employee_name,
            employee_photo: imageUrl,
            employee_phone: data.employee_phone,
            employee_department: data.employee_department,
            employee_designation: data.employee_designation,
            employee_email: data.employee_email,
            employee_joined_date: selectedDate.toISOString().split("T")[0],
            employee_status: data.employee_status
        }

        axiosSecure.post("/new_empl", newEmployee)
            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <form onSubmit={handleSubmit(handleAddEmployee)}>
            <h1 className="text-3xl text-center py-2 font-bold">Employee Form</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2 border-2 rounded-2xl mx-5">
                <div className="flex flex-col gap-2">
                    <label className="label">Emloyee ID</label>
                    <input
                        type="number"
                        className="input"
                        maxLength={5}
                        placeholder="Employee Id"
                        {...register("employee_id")} />

                </div>

                <div className="flex flex-col gap-2">
                    <label className="label">Employee Name</label>
                    <input
                        type="text"
                        className="input"
                        maxLength={11}
                        placeholder="Employee Name"
                        {...register("employee_name")}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="label">Upload Employee Photo </label>
                    <input type="file" className="file-input file-input-ghost" {...register("employee_photo")} />

                </div>
                <div className="flex flex-col gap-2">
                    <label className="label">Phone Number</label>
                    <input
                        type="text"
                        className="input"
                        maxLength={11}
                        placeholder="Phone Numer"
                        {...register("employee_phone")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="label">Department</label>
                    <select defaultValue="Select Department" className="select select-ghost" {...register("employee_department")}>
                        <option disabled={true} className="">Select Department</option>
                        <option>Admin & HR</option>
                        <option>IT</option>
                        <option>Accounts</option>
                        <option>Audit</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="label">Designation</label>
                    <select defaultValue="Select Designation" className="select select-ghost" {...register("employee_designation")}>
                        <option disabled={true} className="">Select Designation</option>
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
                    <label className="label">Employee Email</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="Employee Email"
                        {...register("employee_email")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="label">Joining Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="label">Status</label>
                    <select defaultValue="Select Status" className="select select-ghost" {...register("employee_status")}>
                        <option disabled={true} className="text-gray-50">Select Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <button type="button" onClick={() =>setStep(step+1)} className="btn btn-outline">Next</button>

                <div className="flex flex-col gap-2">
                    <label className="label">Emloyee ID</label>
                    <input
                        type="number"
                        className="input"
                        maxLength={5}
                        placeholder="Employee Id"
                        {...register("employee_id")} />

                </div>
                <button type="submit" className="btn btn-info mt-4 w-full text-center">Submit</button>
            </div>
        </form>
    )
}
export default EmployeeForm;
