import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { SiJoplin, SiMailbox } from "react-icons/si";
import { IoMailSharp, IoPersonSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaBookOpen, FaEdit } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { TbListDetails } from "react-icons/tb";

const EmployeeProfile = () => {
    const { empl_id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [profile, setProfile] = useState([])

    useEffect(() => {
        axiosSecure.get(`/empl/${empl_id}`)
            .then(res => {
                setProfile(res.data)
            })

    }, [empl_id])

    return (
        <div className="w-290 mx-auto">
            <div style={{
                backgroundImage: `url(${profile.employee_photo})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "200px",
                objectFit: "cover",
                position: "relative"
            }}>
                <img src={profile.employee_photo} alt="" className="rounded-full w-30 h-35 object-cover relative top-30 left-3.5" />
            </div>

            <div className="mt-20 flex gap-5">
                <div>
                    <h1 className="text-xl font-bold">{profile.employee_name}</h1>
                    <h1 className="font-semibold">{profile.employee_designation}</h1>
                </div>
                <div className="badge badge-success mt-2">{profile.employee_status}</div>
            </div>

            <div className="my-3 flex items-center gap-4">
                <p className="flex items-center gap-2"><span><SiMailbox /></span>{profile.employee_department}</p>
                <p className="flex items-center gap-2"><span><IoMailSharp /></span>{profile.employee_email}</p>
                <p className="flex items-center gap-2"><span><MdOutlineAccessTime /></span>{profile.employee_joined_date}</p>
            </div>

            <button className="btn btn-info"><span><FaEdit /></span>Edit</button>

            <div className="flex gap-5 my-4">
                <div>
                    <h1 className="font-bold">Employee Id</h1>
                    <span>{profile.employee_id}</span>
                </div>
                <div>
                    <h1 className="font-bold">Employee Department</h1>
                    <span>{profile.employee_department}</span>
                </div>
                <div>
                    <h1 className="font-bold">Working Hours</h1>
                    <span>9 to 6 PM</span>
                </div>
            </div>

            {/* Tabs-- 1  */}

            <Tabs forceRenderTabPanel>
                <TabList>
                    <Tab>Employment Details</Tab>
                    <Tab>Personal Details</Tab>
                    <Tab>Educational Details</Tab>
                    <Tab>Job Experience</Tab>
                </TabList>

                <TabPanel>
                    {/* Employment Details  */}
                    <div className="bg-gray-200 p-3">
                        <h1 className="text-lg font-bold pb-3 flex items-center gap-2"><span><IoPersonSharp /></span>Employment Details</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h2 className="font-semibold">Name</h2>
                                <p className="bg-green-50 w-50 rounded-xs p-1">{profile.employee_name}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Department</h2>
                                <p className="bg-green-50 w-50 rounded-xs p-1">{profile.employee_department}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Designation</h2>
                                <p className="bg-green-50 w-50 rounded-xs p-1">{profile.employee_designation}</p>
                            </div>

                        </div>
                    </div>

                </TabPanel>

                <TabPanel>
                    {/* contact  */}
                    <div className="bg-gray-200 p-3">
                        <h1 className="text-lg font-bold pb-3 flex items-center gap-2"><span><TbListDetails /></span>Contact Information</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h2 className="font-semibold">Employee Email</h2>
                                <p className="bg-green-50 w-50 rounded-xs p-1">{profile.employee_email}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Phone Number</h2>
                                <p className="bg-green-50 w-50 rounded-xs p-1">{profile.employee_phone}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Gender</h2>
                                <p className="bg-green-50 w-50 rounded-xs p-1">{profile.employee_gender}</p>
                            </div>

                        </div>
                        {/* permanent address  */}

                        <div>
                            <h1 className="text-lg font-bold pb-3 mt-10">Permanent Address</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h2 className="font-semibold">Village</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.permanent_village}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">Division</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.permanent_division}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">District</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.permanent_district}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">Upazila</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.permanent_upazila}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">Post Office</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.permanent_post_office}</p>
                                </div>
                            </div>
                            {/* present address  */}

                            <h1 className="text-lg font-bold pb-3 mt-10">Present Address</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h2 className="font-semibold">Village</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.present_village}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">Division</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.present_division}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">District</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.present_district}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">Upazila</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.present_upazila}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold">Post Office</h2>
                                    <p className="bg-green-50 w-50 rounded-xs p-1">{profile.present_post_office}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    {/* Educational Details  */}
                    <div className="bg-gray-200 p-3">
                        <h1 className="text-lg font-bold pb-3 flex items-center gap-2"><span><FaBookOpen /></span>Educational Qualification</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                profile.education?.map((edu, i) =>
                                    <div key={i} className="aura aura-dual my-9">
                                        <div className="card bg-base-100">
                                            <div className="card-body">
                                                <h1 className="font-semibold"><span className="font-bold text-lg">Degree Name:</span> {edu.degree_name}</h1>
                                                <p className="font-semibold"><span className="font-bold text-lg">Institution Name: </span> {edu.institution_name}</p>
                                                <p className="font-semibold"><span className="font-bold text-lg">Subject:</span> {edu.subject}</p>
                                                <p className="font-semibold"><span className="font-bold text-lg">Passing Year: </span> {edu.passing_year}</p>
                                                <p className="font-semibold"><span className="font-bold text-lg">Result: </span> {edu.result}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </TabPanel>


                <TabPanel>
                    {/* Job Experience  */}
                    <div className="bg-gray-200 p-3">
                        <h1 className="text-lg font-bold pb-3 flex items-center gap-2"><span><SiJoplin /></span>Job Experience</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                profile.experience?.map((exp, i) =>
                                    <div key={i} className="aura aura-dual my-9">
                                        <div className="card bg-base-100">
                                            <div className="card-body">
                                                <h1 className="font-semibold"><span className="font-bold text-lg">Organization Name:</span> {exp.organization_name}</h1>
                                                <p className="font-semibold"><span className="font-bold text-lg">Organization Address: </span> {exp.organization_address}</p>
                                                <p className="font-semibold"><span className="font-bold text-lg">Designation:</span> {exp.designation}</p>
                                                <p className="font-semibold"><span className="font-bold text-lg">Duration: </span> {exp.duration}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </TabPanel>
            </Tabs>
        </div >
    )
}
export default EmployeeProfile;


