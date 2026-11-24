import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegClock, FaXmark } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const AttendenceCorrect = () => {
    const axiosSecure = useAxiosSecure()

    const { data: correction = [], isLoading, refetch } = useQuery({
        queryKey: ["correction"],
        queryFn: async () => {
            const res = await axiosSecure.get("/correction")
            return res.data
        }
    })

    const handleStatus = (id, status, date) => {

        axiosSecure.patch(`/correction/${id}/${date}`, { accStatus: status })
            .then(res => {
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Attendence Correction Request ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const { data: corrStat = []} = useQuery({
        queryKey: ["corr_stat"],
        queryFn: async () => {
            const res = await axiosSecure.get("/corr_stat")
            return res.data;
        },
        refetchInterval: 1000
    })

    const to12Hour = (time) => {
        if (!time) return "--";
        const [h, m] = time.split(":");
        const hour = Number(h);
        const ampm = hour >= 12 ? "PM" : "AM";
        return `${hour % 12 || 12}:${m} ${ampm}`;
    };

    return (
        <div>
            <div className="space-x-8 mx-6 my-5">
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Pending Corrections <span className="p-3 bg-purple-100 rounded-xl"><FaRegClock /></span></div>
                        <div className="stat-value">{corrStat[0]?.Pending}</div>
                        <div className="stat-desc">Requires HR approval</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Approved This Month <span className="p-3 bg-green-100 rounded-xl"><FaXmark /></span></div>
                        <div className="stat-value flex items-center">{corrStat[0]?.Accepted}</div>
                        <div className="stat-desc">Average response 4.2 hours</div>
                    </div>
                </div>
                <div className="stats shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Rejected This Month <span className="p-3 bg-red-300 rounded-xl"><ImCross /></span></div>
                        <div className="stat-value">{corrStat[0]?.Rejected}</div>
                        <div className="stat-desc">Insufficient supporting details</div>
                    </div>
                </div>

            </div>

            <div className="overflow-x-auto my-6">
                <table className="table w-280 mx-auto">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Date</th>
                            <th>Original Time</th>
                            <th>Requested Time</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            correction.map((att, i) =>
                                <tr key={att._id}>
                                    <td>{i + 1}</td>
                                    <td>{att.employee_name}</td>
                                    <td>{att.attend_date}</td>
                                    <td className="text-green-700">{to12Hour(att.check_in)} / {to12Hour(att.check_out)}</td>
                                    <td className="text-red-700">{to12Hour(att.correction?.data?.check_in)} / {to12Hour(att.correction?.data?.check_out)}</td>
                                    <td>{att.correction?.data.reason}</td>
                                    <td><div className="badge badge-soft badge-primary">{att.correction?.accStatus}</div></td>
                                    <td>
                                        {
                                            att.correction.accStatus === "Accepted" || att.correction.accStatus === "Rejected"
                                                ?
                                                <div className="space-x-2 flex items-center">
                                                    <button type="button" className="btn btn-outline btn-success" title="Correct" disabled><IoMdCheckmark /></button>
                                                    <button type="button" className="btn btn-outline btn-error" title="Reject" disabled><FaXmark /></button>
                                                </div>
                                                :
                                                <div className="space-x-2 flex items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleStatus(att.employee_id, "Accepted", att.attend_date)}
                                                        className="btn btn-outline btn-success" title="Correct">
                                                        <IoMdCheckmark />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleStatus(att.employee_id, "Rejected", att.attend_date)}
                                                        className="btn btn-outline btn-error" title="Reject">
                                                        <FaXmark />
                                                    </button>
                                                </div>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AttendenceCorrect;