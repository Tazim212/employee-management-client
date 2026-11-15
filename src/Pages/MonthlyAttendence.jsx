import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../Hooks/useAxiosSecure"

const MonthlyAttendence = () => {
    const axiosSecure = useAxiosSecure()

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    return (
        <div>
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
            <div className="flex justify-between items-center mx-0 md:mx-12">
                <div>
                    <h2 className="text-xl font-bold">Monthly Attendence</h2>
                    <p>Total working days, present and absent</p>
                </div>
                <input type="text" placeholder="Type here" className="input w-60" />
            </div>

            <div className="overflow-x-auto my-6">
                <table className="table w-280 mx-auto">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Working Days</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Late</th>
                            <th>On Leave</th>
                            <th>Total Work Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            attendance.map((att, i) => */}
                        <tr>
                            {
                                employees.map(empl => <td>{empl.employee_name}</td>)
                            }

                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                            </td>
                            <td className="space-x-2 flex">
                                {/* <Link><button className="btn btn-outline btn-success" title="Correct">Correct</button></Link> */}
                            </td>
                        </tr>
                        {/* ) */}
                        {/* } */}

                    </tbody>
                </table>
            </div>
        </div >
    )
}
export default MonthlyAttendence;