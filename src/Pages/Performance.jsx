import { useEffect, useRef, useState } from "react"
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { FaRegStar, FaStar } from "react-icons/fa";
import { TbBadgeFilled } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Performance = () => {
    const axiosSecure = useAxiosSecure();
    const [employees, setEmployees] = useState([])
    const [status, setStatus] = useState([])
    const [allReview, setallReview] = useState([])
    const [selectedEmpl, setSelectedEmpl] = useState(null)
    const { handleSubmit, register, reset, control } = useForm({
        defaultValues: {
            communication: 0,
            productivity: 0,
            leadership: 0,
            teamwork: 0
        }
    })

    useEffect(() => {
        axiosSecure.get('/employees')
            .then(res => {
                setEmployees(res.data)
            })
    }, [])

     // ---------------all Reviews ------------

    useEffect(() => {
        axiosSecure.get(`/all_review`)
            .then(res => {
                refetch()
                setallReview(res.data)
            })
    }, [])

    const { data: review = [], refetch } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const res = await axiosSecure.get('/empl_review')
            return res.data;
        }
    })

    useEffect(() => {
        axiosSecure.get(`/empl_reviews?status=Completed`)
            .then(res => {
                refetch()
                setStatus(res.data)
            })
    }, [])

    const handleEmpl = employee => {
        setSelectedEmpl(employee)
    }
    const handleReviews = data => {

        const reviews = {
            employee_name: selectedEmpl.employee_name,
            employee_photo: selectedEmpl.employee_photo,
            employee_designation: selectedEmpl.employee_designation,
            employee_department: selectedEmpl.employee_department,
            communication: Number(data.communication),
            productivity: Number(data.productivity),
            leadership: Number(data.leadership),
            teamwork: Number(data.teamwork),
            comments: data.comments
        }

        axiosSecure.post("/empl_reviews", reviews)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const notCompleted = review.filter(rev =>rev.reviewStatus === "Not Completed")
    console.log(notCompleted)
    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 px-2 py-1 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Performance Reviews</h1>
                    <p>Manage and complete manager reviews for the Q3 2026 cycle.</p>
                </div>

                <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="p-2">
                        <div className="stat-title">Total Reviews</div>
                        <div className="flex items-center gap-1">
                            <div aria-label="status" className="status status-accent"></div>
                            <h2>{allReview.length}</h2>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="stat-title">Not Completed</div>
                        <div className="flex items-center gap-1">
                            <div aria-label="status" className="status status-accent"></div>
                            <h2>{notCompleted.length}</h2>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="stat-title">Completed</div>
                        <div className="flex items-center gap-1">
                            <div aria-label="status" className="status status-accent"></div>
                            <h2>{status.length}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* table  */}

            <section className="flex justify-around items-baseline gap-10 mt-8">

                <div className="ms-4 my-2">
                    <div className="flex gap-2 mb-2">

                        <label className="input w-66">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" required placeholder="Search" />
                        </label>

                        <div className="flex flex-col gap-2">
                            <select defaultValue="Select" className="select w-28">
                                <option >Select</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                    </div>

                    <div className="overflow-scroll h-76 w-96 space-y-4">
                        {
                            review.map(empl =>
                                <div onClick={() => handleEmpl(empl)} key={empl._id} className="flex gap-3 cursor-pointer hover:bg-gray-200 px-2 rounded-xl">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={empl.employee_photo}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center gap-5">
                                        <div>
                                            <div className="font-bold">{empl.employee_name}</div>
                                            <div className="text-sm opacity-50">{empl.employee_designation}</div>
                                        </div>
                                        <div>
                                            <div className="badge badge-soft badge-primary">{empl.reviewStatus}</div>
                                            <p>{empl.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>

                <div>
                    {
                        selectedEmpl === null ?
                            <div className="w-2/3 relative top-35 left-24 text-center space-y-2">
                                <span className="text-2xl flex justify-center items-center"><TbBadgeFilled className="bg-sky-200" /></span>
                                <h1 className="text-lg font-bold">Select an employee to begin</h1>
                                <p>Choose someone from the list to review their KPIs,add manager feedback, and submit their review.</p>
                            </div>
                            :
                            <form onSubmit={handleSubmit(handleReviews)}>
                                <div className="overflow-x-auto h-96 flex-1 w-11/12 space-y-4">

                                    <div className="flex justify-around items-center gap-25">
                                        <div className="flex justify-baseline items-center gap-3">
                                            <img
                                                src={selectedEmpl.employee_photo}
                                                className="w-15 h-15 rounded-full"
                                                alt="Avatar Tailwind CSS Component" />
                                            <div>
                                                <h1 className="font-bold">{selectedEmpl.employee_name}</h1>
                                                <div className="flex items-center">
                                                    <h2 className="text-sm opacity-50">{selectedEmpl.employee_designation}</h2>
                                                    <div className="divider lg:divider-horizontal mx-1"></div>
                                                    <h2 className="text-sm opacity-50">{selectedEmpl.employee_department}</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p>Review cycle</p>
                                            <p>Q3 2026 · Due Sep 30, 2026</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-around items-center gap-10">
                                        <div>
                                            <h1 className="text-xl font-bold">KPI ratings</h1>
                                            <p>Rate each competency from 1 to 5 stars.</p>
                                        </div>

                                        <div className="stats shadow bg-sky-100 w-48">
                                            <div className="stat">
                                                <div className="stat-title pb-2 font-semibold">Overall Score</div>
                                                <div>5</div>
                                                <div className="stat-desc">0 of score 5</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-around items-center gap-8 py-3">

                                        <div>
                                            <h1 className="font-semibold">Communication</h1>
                                            <p>Clarity, listening, and information sharing</p>
                                        </div>
                                        <Controller
                                            name="communication"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <div className="flex gap-3 cursor-pointer">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar
                                                            key={star}
                                                            size={28}
                                                            color={star <= field.value ? "gold" : "gray"}
                                                            onClick={() => field.onChange(star)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        />

                                    </div>

                                    <div className="flex justify-around items-center gap-8 py-3">
                                        <div>
                                            <h1 className="font-semibold">Productivity</h1>
                                            <p>Quality, focus, and delivery against goals</p>
                                        </div>
                                        <Controller
                                            name="productivity"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <div className="flex gap-3 cursor-pointer">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar
                                                            key={star}
                                                            size={28}
                                                            color={star <= field.value ? "gold" : "gray"}
                                                            onClick={() => field.onChange(star)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        />

                                    </div>

                                    <div className="flex justify-around items-cente gap-8 py-3">
                                        <div>
                                            <h1 className="font-semibold">Leadership</h1>
                                            <p>Ownership, judgment, and positive influence</p>
                                        </div>
                                        <Controller
                                            name="leadership"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <div className="flex gap-3 cursor-pointer">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar
                                                            key={star}
                                                            size={28}
                                                            color={star <= field.value ? "gold" : "gray"}
                                                            onClick={() => field.onChange(star)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        />

                                    </div>
                                    <div className="flex justify-around items-center gap-8 py-3">
                                        <div>
                                            <h1 className="font-semibold">Teamwork</h1>
                                            <p>Collaboration, trust, and team contribution</p>
                                        </div>
                                        <Controller
                                            name="teamwork"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <div className="flex gap-3 cursor-pointer">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar
                                                            key={star}
                                                            size={28}
                                                            color={star <= field.value ? "gold" : "gray"}
                                                            onClick={() => field.onChange(star)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <fieldset className="fieldset ms-2">
                                        <legend className="fieldset-legend">Manager Comments</legend>
                                        <textarea className="textarea h-24 w-11/12" placeholder="Bio" {...register("comments")}></textarea>
                                    </fieldset>

                                    <div className="flex justify-evenly items-center my-4 w-11/12">
                                        <p className="ps-2">Rate all four KPIs and add comments to enable submission.</p>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={!selectedEmpl || selectedEmpl.reviewStatus === "Completed"}
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            </form>
                    }
                </div>

            </section >

        </div >
    )
}
export default Performance;