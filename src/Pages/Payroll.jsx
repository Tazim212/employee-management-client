import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useRef, useState } from "react";

const Payroll = () => {
    const axiosSecure = useAxiosSecure()
    const modalRef = useRef()
    const [payDetails, setPayDetails] = useState([])

    const { data: payrolls = [] } = useQuery({
        queryKey: ["payroll"],
        queryFn: async () => {
            const res = await axiosSecure.get("/empl_payroll")
            return res.data
        }
    })

    const handleOpenModal = (id) => {
        modalRef.current.showModal()
        axiosSecure.get(`/empl_payroll/${id}`)
            .then(res => {
                setPayDetails(res.data)
            })
    }

   const totalPaySum = payDetails.meal_allowance + payDetails.basic_salary + payDetails.home_allowance + payDetails.tour_allowance

   const totalDeduction = payDetails.health_insurance + payDetails.income_tax

    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Payroll</h1>
                    <p>Manage salary disbursements and payslips</p>
                </div>
                <Link to="/dashboard/payroll_form"><button className="btn btn-soft btn-warning">Add Payroll</button></Link>
            </div>

            <div className="overflow-x-auto mt-3">
                <table className="table w-287.5 ms-7">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Base Salary</th>
                            <th>Allowances</th>
                            <th>Deductions</th>
                            <th>Net Pay</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payrolls.map(payroll =>
                                <tr key={payroll._id}>
                                    <td>{payroll.employee_name}</td>
                                    <td>{payroll.employee_department}</td>
                                    <td className="text-amber-600">$ {payroll.basic_salary}</td>
                                    <td className="text-green-700">$ {payroll.home_allowance + payroll.tour_allowance + payroll.meal_allowance}</td>
                                    <td className="text-red-600">$ {payroll.income_tax + payroll.health_insurance}</td>
                                    <td>
                                        $ {payroll.basic_salary + payroll.home_allowance + payroll.tour_allowance + payroll.meal_allowance - payroll.income_tax + payroll.health_insurance}
                                    </td>
                                    <td>
                                        <button onClick={() => handleOpenModal(payroll._id)} className="btn btn-primary">Payslip</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_3" ref={modalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-5 text-white">✕</button>
                    </form>
                    <div className="bg-linear-to-l from-black to-blue-800 text-gray-100 p-4 w-full">
                        <h3 className="font-bold text-lg pb-5">Payslip</h3>
                        <h2 className="text-md font-bold">{payDetails.employee_name}</h2>
                        <p>{payDetails.employee_department}</p>
                    </div>

                    <div className="grid grid-cols-12 gap-7 justify-center pt-3">
                        <section className="col-span-6">
                            <h3 className="font-semibold pb-4 text-green-700">Earnings</h3>

                            <div className="flex justify-between gap-9">
                                <p>Basic Salary</p>
                                <p>$ {payDetails.basic_salary}</p>
                            </div>
                            <div className="flex justify-between gap-9">
                                <p>Home Allowance</p>
                                <p>$ {payDetails.home_allowance}</p>
                            </div>
                            <div className="flex justify-between gap-9">
                                <p>Tour Allowance</p>
                                <p>$ {payDetails.tour_allowance}</p>
                            </div>
                            <div className="flex justify-between gap-9">
                                <p>Meal Allowance</p>
                                <p>$ {payDetails.meal_allowance}</p>
                            </div>
                            <div className="flex justify-between gap-9 pt-3">
                                <p className="font-bold">Gross Salary</p>
                                <p>
                                    $ {totalPaySum}
                                </p>
                            </div>

                        </section>
                        <section className="col-span-6">
                            <h3 className="font-semibold pb-4 text-red-600">Deductions</h3>
                            <div className="flex justify-between gap-9">
                                <p>Income Tax</p>
                                <p>$ {payDetails.income_tax}</p>
                            </div>

                            <div className="flex justify-between gap-9">
                                <p>Health Insurance</p>
                                <p>$ {payDetails.health_insurance}</p>
                            </div>
                            <div className="flex justify-between gap-9 pt-15">
                                <p className="font-bold">Total Deduction</p>
                                <p className="text-red-600">$ {totalDeduction}</p>
                            </div>
                        </section>
                    </div>

                    <div className="flex justify-around items-center mt-6 py-4 bg-linear-to-r from-gray-200 to-white">
                        <h1 className="font-extrabold">Net Pay</h1>
                        <p className="text-green-800 font-semibold text-xl">$ {(totalPaySum - totalDeduction).toLocaleString()}</p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-primary">Close</button>
                        </form>
                    </div>
                </div>

            </dialog>
        </div>
    )
}
export default Payroll;