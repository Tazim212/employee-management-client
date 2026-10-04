import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const EmployeeEdit = () => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            experience: [
                {
                    organization_name: "",
                    organization_address: "",
                    duraion: "",
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

    const [selectedDate, setSelectedDate] = useState(new Date());
    const { empl_id } = useParams()
    const [districts, setDistricts] = useState([])
    const [upazilla, setUpazilla] = useState([])
    const [empl, setEmpl] = useState([])
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()

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

    useEffect(() => {
        axiosSecure.get(`/empl/${empl_id}`)
            .then(res => {
                setEmpl(res.data)
                reset(res.data)
            })

    }, [empl_id, reset])

    const handleEmplEdit = async (data) => {
        // let imageUrl = empl.employee_photo;
        // const newPhoto = data.employee_photo?.[0];

        // if (newPhoto) {
        //     const profileImg = data.employee_photo[0];
        //     const formData = new FormData();
        //     formData.append("image", profileImg);
        //     const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_EMP_IMG_KEY}`;

        //     const imgRes = await axios.post(image_api_url, formData);
        //     imageUrl = imgRes.data.data.url;
        // }

        const updateEmpl = {
            employee_id: data.employee_id,
            employee_name: data.employee_name,
            // employee_photo: imageUrl,
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

        axiosSecure.patch(`/empl/${empl_id}`, updateEmpl)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Information has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/dashboard/employees")
                }
            })
    }


    return (
        <form onSubmit={handleSubmit(handleEmplEdit)}>
            <div className="flex justify-between items-center py-5 mx-5 bg-gray-300 px-2 rounded-xl">
                <h1 className="text-3xl font-bold">Employee Form</h1>
                <div className="space-x-3.5 flex justify-center items-center">
                    <button type="submit" className="btn btn-info">Submit</button>
                    <button type="button" className="btn btn-error">Cancel</button>
                </div>

            </div>

            <div className="flex justify-baseline items-center gap-5 mx-5 my-5">
                <button type="button" onClick={() => setStep(1)} className="btn btn-soft btn-succ">Employment (1)</button>
                <button type="button" onClick={() => setStep(2)} className="btn btn-soft btn-succ">Personal Details (2)</button>
                <button type="button" onClick={() => setStep(3)} className="btn btn-soft btn-succ">Educational Qualification (3)</button>
                <button type="button" onClick={() => setStep(4)} className="btn btn-soft btn-succ">Job Experience (4)</button>
            </div>
            {
                step === 1 &&
                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <h1 className="text-md ps-2 py-2 font-semibold">Employment Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">
                        <div className="flex flex-col gap-2">
                            <label className="label">Emloyee ID</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="Employee Id"
                                {...register("employee_id")}
                                defaultValue={empl.employee_id}
                                readOnly
                            />

                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee Name</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Employee Name"
                                {...register("employee_name")}
                                defaultValue={empl.employee_name}
                            />
                        </div>

                        {/* <div className="flex items-center gap-2.5">
                            {empl.employee_photo && (
                                <img
                                    src={empl.employee_photo}
                                    alt="Employee"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="label">Upload Employee Photo </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-ghost"
                                    {...register("employee_photo")}
                                />

                            </div>
                        </div> */}

                        <div className="flex flex-col gap-2">
                            <label className="label">Phone Number</label>
                            <input
                                type="text"
                                className="input"
                                maxLength={11}
                                placeholder="Phone Number"
                                {...register("employee_phone")}
                                defaultValue={empl.employee_phone}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Department</label>
                            <select defaultValue="Select Department" className="select" {...register("employee_department")}>
                                <option disabled={true} className="">Select Department</option>
                                <option value="Admin & HR">Admin & HR</option>
                                <option value="IT">IT</option>
                                <option value="Accounts">Accounts</option>
                                <option value="Audit">Audit</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Designation</label>
                            <select defaultValue="Select Designation" className="select select-ghost" {...register("employee_designation")}>
                                <option disabled={true} className="">Select Designation</option>
                                <option value="Chief Executive">Chief Executive</option>
                                <option value="Deputy Executive">Deputy Executive</option>
                                <option value="Director">Director</option>
                                <option value="Deputy Director">Deputy Director</option>
                                <option value="Program Manager">Program Manager</option>
                                <option value="Manager">Manager</option>
                                <option value="Senior Officer">Senior Officer</option>
                                <option value="Junior Officer">Junior Officer</option>
                                <option value="Assistant Manager">Assistant Manager</option>
                                <option value="Senior IT Officer">Senior IT Officer</option>
                                <option value="Junior IT Officer">Junior IT Officer</option>
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
            }

            {
                step === 2 &&
                <>
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
                                <select defaultValue="Select District" className="select" {...register("permanent_district")}>
                                    <option disabled={true} className="">Select District</option>
                                    {
                                        districts.map(dis => <option key={dis._id}>{dis.district}</option>)
                                    }

                                </select>

                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label">Upazilla</label>
                                <select defaultValue="Select Upazilla" className="select" {...register("permanent_upazila")}>
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

                        <h1 className="text-sm font-semibold ps-2 py-2">Present Address</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 mx-3 ">

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
                                <select defaultValue="Select Division" className="select" {...register("present_division")}>
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
                                <select defaultValue="Select District" className="select" {...register("present_district")}>
                                    <option disabled={true} className="">Select District</option>
                                    {
                                        districts.map(dis => <option key={dis._id}>{dis.district}</option>)
                                    }
                                </select>

                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label">Upazilla</label>
                                <select defaultValue="Select Upazilla" className="select" {...register("present_upazila")}>
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

                            <button type="button" onClick={() => setStep(3)} className="btn btn-info w-30">Next</button>
                        </div>
                    </div>

                </>
            }

            {
                step === 3 &&
                <>
                    <h1 className="text-md font-semibold ps-6 pb-6">Educaional Qualification</h1>
                    {
                        fields.map((field, i) =>
                            <div key={field.id}>
                                <div className="flex justify-around items-center space-y-2 bg-gray-100">
                                    <div className="flex flex-col gap-2">
                                        <label className="label">Degree Name</label>
                                        <select defaultValue="Select Degree" className="select w-25" {...register(`education.${i}.degree_name`)}>
                                            <option>Select</option>
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

                                    <div className="flex items-center mt-5 gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-neutral"
                                            onClick={() => append(
                                                {
                                                    degree_name: "",
                                                    institution_name: "",
                                                    subject: "",
                                                    passing_year: "",
                                                    result: ""
                                                })}
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
                    <div className="flex justify-between mx-5 my-5">
                        <button type="button" onClick={() => setStep(step - 1)} className="btn btn-success">Previous</button>
                        <button type="button" onClick={() => setStep(step + 1)} className="btn btn-info">Next</button>
                    </div>
                </>
            }

            {
                step === 4 &&
                <>
                    <h1 className="text-md font-semibold ps-6 pb-6">Job Experience</h1>
                    {
                        experienceFields.map((field, i) =>
                            <div key={field.id}>
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
                </>
            }
        </form>
    )
}
export default EmployeeEdit;