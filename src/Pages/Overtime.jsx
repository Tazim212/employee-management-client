import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { TbCoinTaka } from "react-icons/tb";
import { FaRegClock, FaUsers } from "react-icons/fa";
import { GrBarChart } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

const Overtime = () => {
    const { handleSubmit, register, reset } = useForm()
    const { handleSubmit: handleEdit, register: editreg, reset: editReset } = useForm()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [editDate, setEditDate] = useState(new Date())
    const [ID, setID] = useState(null)
    const ovrtime = useRef()
    const ovrtime_edit = useRef()

    const axiosSecure = useAxiosSecure()

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    // overtime stat query 
    const { data: overtimeStat = [] } = useQuery({
        queryKey: ['overtime_stat'],
        queryFn: async () => {
            const res = await axiosSecure.get("/overtime_stat")
            return res.data
        }
    })
    console.log(overtimeStat[0]?.pending[0].count)
    const handleOvertimeModal = () => {
        ovrtime.current.showModal()
    }

    const cancleOvertime = () => {
        ovrtime.current.close()
    }

    // add overtime function 

    const { data: overtimes = [], refetch: ovrRefetch } = useQuery({
        queryKey: ['overtime'],
        queryFn: async () => {
            const res = await axiosSecure.get("/overtime")
            return res.data
        }
    })

    const handleAddOvertime = data => {
        const emplOvertime = {
            employee_name: data.employee_name,
            effective_date: selectedDate.toISOString().split("T")[0],
            extra_hours: Number(data.extra_hours),
            hourly_rate: Number(data.hourly_rate),
            status: data.status,
            notes: data.notes
        }

        axiosSecure.post("/overtime", emplOvertime)
            .then(res => {
                cancleOvertime()
                ovrRefetch()
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Overtime Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // overtime update function 

    const handleOvertimeEdit = (ovt) => {
        setID(ovt._id)
        setEditDate(new Date(ovt.effective_date + "T00:00:00"))
        editReset({
            employee_name: ovt.employee_name,
            extra_hours: ovt.extra_hours,
            effective_date: ovt.effective_date,
            hourly_rate: ovt.hourly_rate,
            status: ovt.status,
            notes: ovt.notes,
        })
        ovrtime_edit.current.showModal()
    }

    const handleUpdateOvertime = (data) => {
        const updated = {
            // effective_date: editDate.toISOString().split("T")[0],
            // extra_hours: Number(data.extra_hours),
            // hourly_rate: Number(data.hourly_rate),
            status: data.status,
            // notes: data.notes,
        }
        axiosSecure.patch(`/overtime/${ID}`, updated)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    ovrRefetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Overtime Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                ovrtime_edit.current.close()
            })
    }

    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Overtime Management</h1>
                    <p>Track extra hours, approval status and overtime payments.</p>
                </div>
                <div className="space-x-3">
                    <button onClick={handleOvertimeModal} className="btn btn-soft btn-warning">Add Overtime</button>
                </div>
            </div>
            <div className="space-x-8 mx-6 my-5">
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Total Extra Hours <span className="p-3 bg-purple-100 rounded-xl"><FaRegClock /></span></div>
                        <div className="stat-value">{overtimeStat[0]?.statTotal[0]?.total} h</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Overtime Total Payment <span className="p-3 bg-green-100 rounded-xl"><GrBarChart /></span></div>
                        <div className="stat-value flex items-center"><span><TbCoinTaka></TbCoinTaka></span> {overtimeStat[0]?.statTotal[0]?.totalPay}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Pending Approval <span className="p-3 bg-amber-100 rounded-xl"><FaRegClock /></span></div>
                        <div className="stat-value">{overtimeStat[0]?.pending[0].count}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Total Employees <span className="p-3 bg-sky-100 rounded-xl"><FaUsers></FaUsers></span></div>
                        <div className="stat-value">{overtimeStat[0]?.statTotal[0]?.totalEmpl}</div>
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
                <table className="table max-w-280 mx-4">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>Employee ID</th>
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
                            overtimes.map((ovt) =>
                                <tr key={ovt._id}>
                                    <td>{ovt.employee_details?.employee_id}</td>
                                    <td>
                                        <div>
                                            <h2 className="font-semibold">{ovt.employee_name}</h2>
                                            <p>{ovt.employee_details?.employee_designation}</p>
                                        </div>
                                    </td>
                                    <td>{ovt.effective_date}</td>
                                    <td>{ovt.extra_hours} hr</td>
                                    <td>
                                        <div className="flex gap-1 items-center">
                                            <span><TbCoinTaka></TbCoinTaka></span>
                                            <p>{ovt.hourly_rate}/hr</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-1 items-center">
                                            <span><TbCoinTaka></TbCoinTaka></span>
                                            <p>{ovt.extra_hours * ovt.hourly_rate}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge badge-soft badge-accent">{ovt.status}</div>
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => handleOvertimeEdit(ovt)} className="btn btn-success">Review</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

            {/* add overtime modal  */}

            <dialog ref={ovrtime} className="modal">
                <form onSubmit={handleSubmit(handleAddOvertime)} >

                    <div className="border-2 rounded-2xl mx-5 bg-linear-to-r from-sky-900 to-emerald-300 opacity-90 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-9 mx-3">

                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Employee Name</label>
                                <select className="select" {...register("employee_name")}>
                                    <option value="Select Employee">Select Employee</option>
                                    {
                                        employees?.map(empl => <option key={empl._id}>{empl.employee_name}</option>)
                                    }
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Extra Hours</label>
                                <input type="number" placeholder="3,3.5" className="input" {...register("extra_hours")} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Effective Date</label>
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
                                <label className="label text-gray-100">Hourly Rate</label>
                                <input type="number" placeholder="rate" className="input" {...register("hourly_rate")} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Status</label>
                                <select className="select" {...register("status")}>
                                    <option value="Select Employee">Select</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Notes</label>
                                <textarea placeholder="Remarks" className="textarea textarea-accent" {...register("notes")}></textarea>
                            </div>
                        </div>

                        <button type="button" onClick={cancleOvertime} className="absolute right-5 top-5 cursor-pointer p-1.5 rounded-lg hover:bg-gray-200"><RxCross1 /></button>

                        <div className="flex items-center mb-2">
                            <button type="submit" className="btn btn-info m-2 flex justify-end">Submit</button>
                            <button onClick={cancleOvertime} type="button" className="btn btn-error m-2 flex justify-end">Cancel</button>
                        </div>

                    </div>
                </form>
            </dialog>

            {/* edit modal  */}

            <dialog ref={ovrtime_edit} className="modal">
                <form onSubmit={handleEdit(handleUpdateOvertime)} >

                    <div className="border-2 rounded-2xl mx-5 bg-linear-to-r from-sky-900 to-emerald-300 opacity-90 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-9 mx-3">

                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Employee Name</label>
                                <input type="text" placeholder="3,3.5" className="input" {...editreg("employee_name")} readOnly />
                            </div>


                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Effective Date</label>
                                <DatePicker
                                    selected={editDate}
                                    onChange={setEditDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    className="input input-bordered w-80"
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Extra Hours</label>
                                <input type="number" placeholder="3,3.5" className="input" {...editreg("extra_hours")} readOnly />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Hourly Rate</label>
                                <input type="number" placeholder="rate" className="input" {...editreg("hourly_rate")} readOnly />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Status</label>
                                <select className="select" {...editreg("status")}>
                                    <option value="Select Employee">Select</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="label text-gray-100">Notes</label>
                                <textarea placeholder="Remarks" className="textarea textarea-accent" {...editreg("notes")} readOnly></textarea>
                            </div>
                        </div>
                        <button type="button" onClick={() => ovrtime_edit.current.close()} className="absolute right-5 top-5 cursor-pointer p-1.5 rounded-lg hover:bg-gray-200"><RxCross1 /></button>

                        <div className="flex items-center mb-3">
                            <button type="submit" className="btn btn-success m-2 flex justify-end">Update Review</button>
                            <button onClick={() => ovrtime_edit.current.close()} type="button" className="btn btn-error m-2 flex justify-end">Cancel</button>
                        </div>

                    </div>
                </form>
            </dialog>
        </div >
    )
}
export default Overtime;