import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../Hooks/useAxiosSecure"

const MonthlyPayroll = () => {

    const axiosSecure = useAxiosSecure()

    const { data: payrolls = [] } = useQuery({
        queryKey: ["payroll"],
        queryFn: async () => {
            const res = await axiosSecure.get("/empl_payroll")
            return res.data
        }
    })

    return (
        <div>
            <div>
                <h2 className="text-xl font-bold">Payroll Records</h2>
                <p>All employee payroll for March 2025</p>
            </div>

            <div className="overflow-x-auto mt-3">
                <table className="table w-287.5 ms-7">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Base Salary</th>
                            <th>Total Allowances</th>
                            <th>Total Deductions</th>
                            <th>Net Pay</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payrolls.map((payroll, i) =>
                                <tr>
                                    <td>{payroll.employee_name}</td>
                                    <td>{payroll.basic_salary}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        }
                        <tr>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default MonthlyPayroll;