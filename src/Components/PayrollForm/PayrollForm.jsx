import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";

const PayrollForm = () => {
    const { handleSubmit, register, watch, setValue } = useForm()
    const [employees, setEmployees] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/employees')
            .then(res => {
                setEmployees(res.data)
            })
    }, [])

    // const emplId = watch("employee_name")

    // const selectEMpl = employees.find(e => e.employee_name === emplId)

    // useEffect(() => {
    //     setValue(
    //         "employee_department",
    //         selectEMpl?.employee_department || ""
    //     );
    // }, [selectEMpl, setValue]);

    const handleAddPayroll = data => {
        const addPayroll = {
            employee_name: data.employee_name,
            employee_department: data.employee_department,
            salary_month: selectedDate.toISOString().split("T")[0],
            basic_salary: Number(data.basic_salary),
            home_allowance: Number(data.home_allowance),
            tour_allowance: Number(data.tour_allowance),
            meal_allowance: Number(data.meal_allowance),
            income_tax: Number(data.income_tax),
            health_insurance: Number(data.health_insurance),
            status: data.status
        }

        axiosSecure.post("/empl_pay", addPayroll)
            .then(res => {
                if (res.data.insertedId) {
                    navigate('/dashboard/payroll')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <h1 className="text-xl py-2 font-bold ps-5">Payroll Form</h1>

            <form onSubmit={handleSubmit(handleAddPayroll)} >

                <div className="border-2 rounded-2xl mx-5 bg-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-9 px-2">

                        <div className="flex flex-col gap-2">
                            <label className="label">Designation</label>
                            <select className="select select-ghost" {...register("employee_name")}>
                                <option value="Select Employee">Select Employee</option>
                                {
                                    employees?.map(empl => <option key={empl._id}>{empl.employee_id}- {empl.employee_name}</option>)
                                }
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Department</label>
                            <select defaultValue="Select Department" className="select" {...register("employee_department")}>
                                <option>Select Department</option>
                                <option value="Admin & HR">Admin & HR</option>
                                <option value="IT">IT</option>
                                <option value="Accounts">Accounts</option>
                                <option value="Audit">Audit</option>
                            </select>
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
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Home Allowance</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="$home allowance"
                                {...register("home_allowance")}
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
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="label">Meal Allowance</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="$meal allowance"
                                {...register("meal_allowance")}
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
                            />
                        </div>
                        <div className="flex flex-col gap-2 ps-2">
                            <label className="label">Status</label>
                            <select defaultValue="Select Department" className="select w-30" {...register("status")}>
                                <option >Select</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info m-2 flex justify-end">Submit</button>

                </div>
            </form>
        </div>
    )
}
export default PayrollForm;