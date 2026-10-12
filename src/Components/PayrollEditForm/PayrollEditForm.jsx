import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

const PayrollEditForm = () => {
    const { id } = useParams()
    const { handleSubmit, register, reset } = useForm()
    const [payrolls, setPayrolls] = useState([])
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        axiosSecure.get(`/empl_payroll/${id}`)
            .then(res => {
                setPayrolls(res.data)
                reset(res.data)
            })

    }, [id, reset])

    const updtStatus = (id,data) =>{
        const updated = {
            status: data.status
        }

        axiosSecure.patch(`/empl_pay/${id}`, updated)
        .then(res =>{
            // console.log(res.data)
            if(res.data.matchedCount > 0){
                navigate("/dashboard/payroll")
            }
        })
    }

    return (
        <div>
            <h1 className="text-xl py-2 font-bold ps-5">Payroll Form</h1>

            <form onSubmit={handleSubmit((data) => updtStatus(id, data))} >

                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">

                        <div className="flex flex-col gap-2">
                            <label className="label">Employee Name</label>
                            <input type="text" defaultValue={payrolls.employee_name} className="input" readOnly />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Department</label>
                            <input type="text" defaultValue={payrolls.employee_department} className="input" readOnly/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Salary Month</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={setSelectedDate}
                                peekNextMonth
                                showMonthYearPicker
                                dropdownMode="select"
                                dateFormat="MM/yyyy"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Basic Salary</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="$basic salary"
                                {...register("basic_salary")}
                                defaultValue={payrolls.basic_salary}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Home Allowance</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="$home allowance"
                                {...register("home_allowance")}
                                defaultValue={payrolls.home_allowance}
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="label">Tour Allowance</label>
                            <input
                                type="number"
                                className="input"
                                maxLength={11}
                                placeholder="$tour allowance"
                                {...register("tour_allowance")}
                                defaultValue={payrolls.tour_allowance}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Meal Allowance</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="$meal allowance"
                                {...register("meal_allowance")}
                                defaultValue={payrolls.meal_allowance}
                                readOnly
                            />
                        </div>

                        {/* Deduction  */}

                        <div className="flex flex-col gap-2">
                            <label className="label">Income Tax</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="$ income tax"
                                {...register("income_tax")}
                                defaultValue={payrolls.income_tax}
                                readOnly
                            />

                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Health Insurance</label>
                            <input
                                type="number"
                                className="input"
                                maxLength={11}
                                placeholder="$ health insurance"
                                {...register("health_insurance")}
                                defaultValue={payrolls.health_insurance}
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col gap-2 ps-2">
                            <label className="label">Status</label>
                            <select defaultValue="Select" className="select w-30" {...register("status")}>
                                <option >Select</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info m-2 flex justify-end">Update</button>

                </div>
            </form>
        </div>
    )
}
export default PayrollEditForm;