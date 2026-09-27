import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxios from "../../Hooks/useAxios";

const EmployeeForm = () => {
    const { register, handleSubmit } = useForm()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [districts, setDistricts] = useState([])
    const [upazilla, setUpazilla] = useState([])
    const [step, setStep] = useState(1)
    const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()

    // this api is for all district 
    axiosInstance.get("/district")
        .then(res => {
            setDistricts(res.data)
        })

    // this api is for all upazilla

    axiosInstance.get("/upazilla")
        .then(res => {
            setUpazilla(res.data)
        })

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
            {
                step === 1 &&
                <div className="border-2 rounded-2xl mx-5">
                    <h1 className="text-xl ps-2 py-2 font-semibold">Employment Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">
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

                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={() => setStep(2)} className="btn btn-info mb-4 mx-2 w-30">Next</button>
                    </div>
                </div>
            }
            {
                step === 2 &&
                <>
                    <h1>Personal Details</h1>

                    {/* Permanent Address */}

                    <div className="border-2 rounded-2xl mx-5">
                        <h1 className="text-md font-semibold ps-2 py-3">Permanent Address</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">

                            <div className="flex flex-col gap-2">
                                <label className="label">Village</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Village"
                                    {...register("permanent_village")} />

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Division</label>
                                <select defaultValue="Select Division" className="select select-ghost" {...register("permanent_division")}>
                                    <option disabled={true} className="">Select Division</option>
                                    <option>Chittagong</option>
                                    <option>Rangpur</option>
                                    <option>Sylhet</option>
                                    <option>Mymensingh</option>
                                    <option>Khulna</option>
                                    <option>Dhaka</option>
                                    <option>Rajshahi</option>
                                    <option>Barisal</option>
                                </select>

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">District</label>
                                <select defaultValue="Select District" className="select select-ghost" {...register("permanent_district")}>
                                    <option disabled={true} className="">Select District</option>
                                    {
                                        districts.map(dis => <option key={dis._id}>{dis.district}</option>)
                                    }

                                </select>

                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label">Upazilla</label>
                                <select defaultValue="Select Upazilla" className="select select-ghost" {...register("permanent_upazilla")}>
                                    <option disabled={true} className="">Select Upazilla</option>
                                    {
                                        upazilla.map(upz => <option key={upz._id}>{upz.upazila}</option>)
                                    }

                                </select>

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Post Office</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Post Office"
                                    {...register("permanent_post_office")} />

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Postal Code</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Postal Code"
                                    {...register("permanent_postal_code")} />

                            </div>
                        </div>
                        {/* Present Address  */}

                        <h1 className="text-md font-semibold ps-2 py-3">Present Address</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 mx-3 ">

                            <div className="flex flex-col gap-2">
                                <label className="label">Village</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Village"
                                    {...register("present_village")} />

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Division</label>
                                <select defaultValue="Select Division" className="select select-ghost" {...register("present_division")}>
                                    <option disabled={true} className="">Select Division</option>
                                    <option>Chittagong</option>
                                    <option>Rangpur</option>
                                    <option>Sylhet</option>
                                    <option>Mymensingh</option>
                                    <option>Khulna</option>
                                    <option>Dhaka</option>
                                    <option>Rajshahi</option>
                                    <option>Barisal</option>
                                </select>

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">District</label>
                                <select defaultValue="Select District" className="select select-ghost" {...register("present_district")}>
                                    <option disabled={true} className="">Select District</option>
                                    {
                                        districts.map(dis => <option key={dis._id}>{dis.district}</option>)
                                    }
                                </select>

                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label">Upazilla</label>
                                <select defaultValue="Select Upazilla" className="select select-ghost" {...register("present_upazilla")}>
                                    <option disabled={true} className="">Select Upazilla</option>
                                    {
                                        upazilla.map(upz => <option key={upz._id}>{upz.upazila}</option>)
                                    }
                                </select>

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Post Office</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Post Office"
                                    {...register("present_post_office")} />

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Postal Code</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Postal Code"
                                    {...register("present_postal_code")} />

                            </div>
                        </div>
                        <div className="flex justify-between mx-5 mb-3">
                            <button type="button" onClick={() => setStep(step - 1)} className="btn btn-success">Previous</button>

                            <button type="button" onClick={() => setStep(3)} className="btn btn-info">Next</button>
                        </div>
                    </div>

                </>
            }

            {/* <button type="submit" className="btn btn-info mt-4 w-full text-center">Submit</button> */}
        </form>
    )
}
export default EmployeeForm;
