import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxios from "../../Hooks/useAxios";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const EmployeeForm = () => {
    const { register, handleSubmit, control, reset, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            experience: [
                {
                    organization_name: "",
                    organization_address: "",
                    duration: "",
                    designation: ""
                }
            ],
            education: [
                {
                    degree_name: "",
                    institution_name: "",
                    subject: "",
                    passing_year: "",
                    result: ""
                }
            ]
        }
    })
    const { fields, append, remove } = useFieldArray(
        { control, name: "education" }
    )
    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience
    } = useFieldArray({
        control,
        name: "experience"
    });

    const permanentAddress = useWatch({
        control,
        name: [
            "permanent_village",
            "permanent_division",
            "permanent_district",
            "permanent_upazila",
            "permanent_post_office",
            "permanent_postal_code"
        ]
    })

    const sameAsPerma = watch("sameAsPerma")
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [districts, setDistricts] = useState([])
    const [upazilla, setUpazilla] = useState([])
    const [step, setStep] = useState(1)
    const [sameAdd, setSameAdd] = useState(false)
    const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    useEffect(() => {
        if (sameAsPerma) {
            setValue("present_village", permanentAddress[0]);
            setValue("present_division", permanentAddress[1]);
            setValue("present_district", permanentAddress[2]);
            setValue("present_upazila", permanentAddress[3]);
            setValue("present_post_office", permanentAddress[4]);
            setValue("present_postal_code", permanentAddress[5]);
        }
    }, [sameAsPerma, permanentAddress, setValue])

    // this api is for all district 
    useEffect(() => {
        axiosInstance.get("/district")
            .then(res => {
                setDistricts(res.data)
            })
    }, [])

    // this api is for all upazilla

    useEffect(() => {
        axiosInstance.get("/upazilla")
            .then(res => {
                setUpazilla(res.data)
            })

    }, [])

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
            employee_gender: data.employee_gender,
            employee_email: data.employee_email,
            employee_joined_date: selectedDate.toISOString().split("T")[0],
            employee_status: data.employee_status,
            permanent_village: data.permanent_village,
            permanent_division: data.permanent_division,
            permanent_district: data.permanent_district,
            permanent_upazila: data.permanent_upazila,
            permanent_post_office: data.permanent_post_office,
            permanent_postal_code: data.permanent_postal_code,
            present_village: data.present_village,
            present_division: data.present_division,
            present_district: data.present_district,
            present_upazila: data.present_upazila,
            present_post_office: data.present_post_office,
            present_postal_code: data.present_postal_code,
            education: data.education,
            experience: data.experience
        }

        axiosSecure.post("/new_empl", newEmployee)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New Employee has been addeded successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/dashboard/employees")
                }
            })
    }

    return (
        <form onSubmit={handleSubmit(handleAddEmployee)}>
            <div className="flex justify-between items-center mx-5 bg-gray-300 py-1.5 px-2 rounded-xl">
                <h1 className="text-xl font-bold">Employee Form</h1>
                <div className="space-x-3.5">
                    <button type="submit" className="bg-green-600 py-1.5 px-2.5 rounded-lg text-white cursor-pointer">Submit</button>
                    <Link to="/dashboard/employees"><button type="button" className="bg-red-600 py-1.5 px-2.5 rounded-lg text-white cursor-pointer">Cancel</button></Link>
                </div>

            </div>

            <div className="flex justify-baseline items-center gap-5 mx-5 my-5">
                <button type="button" onClick={() => setStep(1)} className="btn btn-soft btn-success">Employment (1)</button>
                <button type="button" onClick={() => setStep(2)} className="btn btn-soft btn-success">Personal Details (2)</button>
                <button type="button" onClick={() => setStep(3)} className="btn btn-soft btn-success">Educational Qualification (3)</button>
                <button type="button" onClick={() => setStep(4)} className="btn btn-soft btn-success">Job Experience (4)</button>
            </div>

            <div className={step === 1 ? "block" : "hidden"}>
                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <h1 className="text-md ps-2 py-2 font-semibold">Employment Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">
                        <div className="flex flex-col gap-2">
                            <label className="label">Emloyee ID</label>
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
                            <input
                                type="text"
                                className="input"
                                placeholder="Employee Name"
                                {...register("employee_name")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Upload Employee Photo </label>
                            <input type="file" accept="image/*" className="file-input file-input-ghost" {...register("employee_photo")} />

                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Phone Number</label>
                            <input
                                type="text"
                                className="input"
                                maxLength={11}
                                placeholder="Phone Number"
                                {...register("employee_phone")}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Department</label>
                            <select defaultValue="Select Department" className="select" {...register("employee_department")}>
                                <option disabled={true}>Select Department</option>
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
                            <label className="label">Gender</label>
                            <select defaultValue="Select" className="select select-ghost" {...register("employee_gender")}>
                                <option className="text-gray-50">Select</option>
                                <option>Male</option>
                                <option>Female</option>
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

            </div>

            <div className={step === 2 ? "block" : "hidden"}>
                {/* Permanent Address */}

                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <h1 className="text-md font-bold ps-2 py-2">Personal Details</h1>
                    <h1 className="text-sm font-semibold ps-2 py-1">Permanent Address</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 px-2">

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
                            <select defaultValue="Select Division" className="select" {...register("permanent_division")}>
                                <option disabled={true}>Select Division</option>
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
                            <select defaultValue="Select District" className="select" {...register("permanent_district")}>
                                <option disabled={true}>Select District</option>
                                {
                                    districts.map(dis => <option key={dis._id}>{dis.district}</option>)
                                }

                            </select>

                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Upazilla</label>
                            <select defaultValue="Select Upazilla" className="select" {...register("permanent_upazila")}>
                                <option disabled={true}>Select Upazilla</option>
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

                    <div className="flex justify-end pr-16 pt-3">
                    <span><input type="checkbox" className="checkbox" {...register("sameAsPerma")} /> Same as permanent address</span>
                    </div>

                    {/* Present Address  */}

                    <h1 className="text-sm font-semibold ps-2 py-2">Present Address</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 mx-3 ">

                        <div className="flex flex-col gap-2">
                            <label className="label">Village</label>
                            <input
                                type="text"
                                className="input cursor-pointer"
                                placeholder="Village"
                                disabled={sameAsPerma}
                                {...register("present_village")} />

                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Division</label>
                            <select defaultValue="Select Division" disabled={sameAsPerma} className="select cursor-pointer" {...register("present_division")}>
                                <option disabled={true}>Select Division</option>
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
                            <select defaultValue="Select District" disabled={sameAsPerma} className="select cursor-pointer" {...register("present_district")}>
                                <option disabled={true}>Select District</option>
                                {
                                    districts.map(dis => <option key={dis._id}>{dis.district}</option>)
                                }
                            </select>

                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Upazilla</label>
                            <select defaultValue="Select Upazilla" disabled={sameAsPerma} className="select cursor-pointer" {...register("present_upazila")}>
                                <option disabled={true}>Select Upazilla</option>
                                {
                                    upazilla.map(upz => <option key={upz._id}>{upz.upazila}</option>)
                                }
                            </select>

                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Post Office</label>
                            <input
                                type="text"
                                className="input cursor-pointer"
                                placeholder="Post Office"
                                disabled={sameAsPerma}
                                {...register("present_post_office")} />

                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Postal Code</label>
                            <input
                                type="text"
                                className="input cursor-pointer"
                                placeholder="Postal Code"
                                disabled={sameAsPerma}
                                {...register("present_postal_code")} />

                        </div>
                    </div>
                    <div className="flex justify-between mx-5 mb-3">
                        <button type="button" onClick={() => setStep(step - 1)} className="btn btn-success">Previous</button>

                        <button type="button" onClick={() => setStep(3)} className="btn btn-info w-30">Next</button>
                    </div>
                </div>
            </div>

            <div className={step === 3 ? "block" : "hidden"}>
                <h1 className="text-md font-semibold ps-6 pb-6">Educaional Qualification</h1>
                {
                    fields.map((field, i) =>
                        <div key={field.id} className="mx-5.5">
                            <div className="flex justify-around items-center space-y-2 bg-gray-100">
                                <div className="flex flex-col gap-2">
                                    <label className="label">Degree Name</label>
                                    <select className="select w-25" {...register(`education.${i}.degree_name`)}>
                                        <option value="">Select</option>
                                        <option>SSC</option>
                                        <option>HSC</option>
                                        <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>Diploma</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="label">Institution Name</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`education.${i}.institution_name`)} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="label">Subject</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`education.${i}.subject`)} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="label">Passing Year</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`education.${i}.passing_year`)} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="label">Result</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`education.${i}.result`)} />
                                </div>

                                <div className="mt-5">
                                    {
                                        i === 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-error"
                                                onClick={() => reset()}>
                                                <FaTrash></FaTrash>
                                            </button>
                                        )
                                    }

                                    {
                                        i !== 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-error"
                                                onClick={() => remove(i)}
                                            >
                                                <FaTrash></FaTrash>
                                            </button>
                                        )}
                                </div>

                            </div>
                        </div>
                    )
                }
                <button
                    type="button"
                    className="btn btn-neutral ms-5.5 my-2.5"
                    onClick={() => append(
                        {
                            degree_name: "",
                            institution_name: "",
                            subject: "",
                            passing_year: "",
                            result: ""
                        })}
                >
                    Add Row +
                </button>
                <div className="flex justify-between mx-5 my-5">
                    <button type="button" onClick={() => setStep(step - 1)} className="btn btn-success">Previous</button>
                    <button type="button" onClick={() => setStep(step + 1)} className="btn btn-info">Next</button>
                </div>
            </div>

            <div className={step === 4 ? "block" : "hidden"}>
                <h1 className="text-md font-semibold ps-6 pb-6">Job Experience</h1>
                {
                    experienceFields.map((field, i) =>
                        <div key={field.id} className="mx-5.5">
                            <div className="flex justify-around items-center space-y-2 bg-gray-100">

                                <div className="flex flex-col gap-2">
                                    <label className="label">Organization Name</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`experience.${i}.organization_name`)} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="label">Organization Address</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`experience.${i}.organization_address`)} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="label">Designation</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`experience.${i}.designation`)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="label">Duration</label>
                                    <input type="text" placeholder="Type here" className="input" {...register(`experience.${i}.duration`)} />
                                </div>

                                <div className="flex items-center mt-5 gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-neutral"
                                        onClick={() => appendExperience(
                                            {
                                                organization_name: "",
                                                organization_address: "",
                                                duration: "",
                                                designation: "",
                                            }
                                        )}
                                    >
                                        +
                                    </button>
                                    {
                                        i === 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-error"
                                                onClick={() => reset()}>
                                                <FaTrash></FaTrash>
                                            </button>
                                        )
                                    }

                                    {
                                        i !== 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-error"
                                                onClick={() => removeExperience(i)}
                                            >
                                                <FaTrash></FaTrash>
                                            </button>
                                        )}
                                </div>

                            </div>
                        </div>
                    )
                }
                <div className="flex justify-between mx-5 my-5">
                    <button type="button" onClick={() => setStep(step - 1)} className="btn btn-success">Previous</button>
                </div>
            </div>

            <div className="text-center">
                <span className="font-semibold">step {step} of 4</span>
            </div>
        </form>
    )
}
export default EmployeeForm;
