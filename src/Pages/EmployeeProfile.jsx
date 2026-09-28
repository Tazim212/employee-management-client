import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { SiMailbox } from "react-icons/si";
import { IoMailSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

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
            <div className="bg-linear-to-r from-blue-300 to-emerald-700">
                <img src={profile.employee_photo} alt="" className="rounded-xl w-22 h-25 relative top-13 left-3.5" />
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

            {/* Tabs  */}

            <Tabs forceRenderTabPanel defaultIndex={1}>
                <TabList>
                    <Tab>Employment Details</Tab>
                    <Tab>Personal Details</Tab>
                    <Tab>Educational Details</Tab>
                    <Tab>Job Experience</Tab>
                </TabList>
                <TabPanel>
                    <Tabs forceRenderTabPanel>
                        <TabPanel>
                            <p>Husband of Marge; father of Bart, Lisa, and Maggie.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png" alt="Homer Simpson" />
                        </TabPanel>
                        <TabPanel>
                            <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png" alt="Marge Simpson" />
                        </TabPanel>
                        <TabPanel>
                            <p>Oldest child and only son of Homer and Marge; brother of Lisa and Maggie.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png" alt="Bart Simpson" />
                        </TabPanel>
                        <TabPanel>
                            <p>Middle child and eldest daughter of Homer and Marge; sister of Bart and Maggie.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png" alt="Lisa Simpson" />
                        </TabPanel>
                        <TabPanel>
                            <p>Youngest child and daughter of Homer and Marge; sister of Bart and Lisa.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png" alt="Maggie Simpson" />
                        </TabPanel>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                    <Tabs forceRenderTabPanel>
                        <TabPanel>
                            <p>Protagonist, from the 20th Century. Delivery boy. Many times great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png" alt="Philip J. Fry" />
                        </TabPanel>
                        <TabPanel>
                            <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
                        </TabPanel>
                        <TabPanel>
                            <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is Fry's best friend. Built in Tijuana, Mexico, he is the Planet Express Ship's cook.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png" alt="Bender Bending Rodriguez" />
                        </TabPanel>
                        <TabPanel>
                            <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Many times great-nephew of Fry. CEO and owner of Planet Express delivery company. Tenured professor of Mars University.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png" alt="Professor Hubert J. Farnsworth" />
                        </TabPanel>
                        <TabPanel>
                            <p>Alien from Decapod 10. Planet Express' staff doctor and steward. Has a medical degree and Ph.D in art history.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png" alt="Doctor John Zoidberg" />
                        </TabPanel>
                    </Tabs>
                </TabPanel>
            </Tabs>

        </div>
    )
}
export default EmployeeProfile;