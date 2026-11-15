import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { TbCoinTaka } from "react-icons/tb";

const Overtime = () => {
    const { handleSubmit, register, reset } = useForm()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const ovrtime = useRef()

    const axiosSecure = useAxiosSecure()

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    const handleOvertime = () => {
        ovrtime.current.showModal()
    }
    const cancleOvertime = () => {
        ovrtime.current.close()
    }

    const handleAddOvertime = data => {
        const emplOvertime = {
            employee_name: data.employee_name,
            effective_date: selectedDate.toISOString().split("T")[0],
            extra_hours: data.extra_hours,
            hourly_rate: data.hourly_rate,
            status: data.status,
            notes: data.notes
        }

        axiosSecure.post("/overtime", emplOvertime)
            .then(res => {
                cancleOvertime()
                reset()
                if (res.data.insertedId) {
                    Swal.fire("Overtime Addeded Successfully")
                }
            })
    }

    const { data: overtimes = [] } = useQuery({
        queryKey: ['overtime'],
        queryFn: async () => {
            const res = await axiosSecure.get("/overtime")
            return res.data
        }
    })
    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Overtime Management</h1>
                    <p>Track extra hours, approval status and overtime payments.</p>
                </div>
                <div className="space-x-3">
                    <button onClick={handleOvertime} className="btn btn-soft btn-warning">Add Overtime</button>
                </div>
            </div>
            <div className="space-x-4 mx-6 my-5">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>


            <div className="overflow-x-auto space-y-4 bg-gray-100 m-6 py-3 rounded-3xl">
                <div className="flex justify-between items-center mx-0 md:mx-6">
                    <div>
                        <h2 className="text-xl font-bold">Overtime Records</h2>
                        <p>Extra hours and calculated payments</p>
                    </div>
                    <input type="text" placeholder="Type here" className="input w-60" />
                </div>
                <table className="table w-280 mx-auto">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Date</th>
                            <th>Extra Hours</th>
                            <th>Hourly Rate</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            overtimes.map((ovt, i) =>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{ovt.employee_name}</td>
                                    <td>{ovt.effective_date}</td>
                                    <td>{ovt.extra_hours} hr</td>
                                    <td className="flex gap-2 items-center pt-5"><span><TbCoinTaka></TbCoinTaka></span> {ovt.hourly_rate}/hr</td>
                                    <td>200</td>
                                    <td>{ovt.status}</td>
                                    <td>
                                        <button className="btn btn-soft btn-success">Review</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_1" ref={ovrtime} className="modal">
                <form onSubmit={handleSubmit(handleAddOvertime)} >

                    <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">

                            <div className="flex flex-col gap-2">
                                <label className="label">Employee Name</label>
                                <select className="select select-ghost" {...register("employee_name")}>
                                    <option value="Select Employee">Select Employee</option>
                                    {
                                        employees?.map(empl => <option key={empl._id}>{empl.employee_name}</option>)
                                    }
                                </select>
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
                                <label className="label">Extra Hours</label>
                                <input type="number" placeholder="3,3.5" className="input" {...register("extra_hours")} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Hourly Rate</label>
                                <input type="number" placeholder="rate" className="input" {...register("hourly_rate")} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Status</label>
                                <select className="select select-ghost" {...register("status")}>
                                    <option value="Select Employee">Select</option>
                                    <option value="approve">Approved</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label">Notes</label>
                                <textarea placeholder="Remarks" className="textarea textarea-accent" {...register("notes")}></textarea>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button onClick={cancleOvertime} type="button" className="btn btn-error m-2 flex justify-end">Cancel</button>
                            <button type="submit" className="btn btn-info m-2 flex justify-end">Submit</button>
                        </div>

                    </div>
                </form>
            </dialog>
        </div >
    )
}
export default Overtime;