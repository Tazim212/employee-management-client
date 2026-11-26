import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subMonths, addMonths, format } from "date-fns";
import * as XLSX from "xlsx";

const AttendenceRecord = () => {
    const axiosSecure = useAxiosSecure()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");

    const month = format(selectedDate, "yyyy-MM");

    const { data: monthlyRepo = [], isLoading } = useQuery({
        queryKey: ["monthly_att", month],
        queryFn: async () => {
            const res = await axiosSecure.get(`/monthly_report?month=${month}`)
            return res.data
        }
    })

    const filteredRepo = monthlyRepo.filter(repo =>
        repo.employee_name?.toLowerCase().includes(search.toLowerCase()) ||
        repo.employee_id?.toString().toLowerCase().includes(search.toLowerCase())
    );

    const handleExport = () => {
        if (!filteredRepo.length) {
            return alert("No attendance records to export!");
        }

        const exportData = filteredRepo.map((repo, index) => ({
            "SL": index + 1,
            "Employee ID": repo.employee_id,
            "Employee Name": repo.employee_name,
            "Department": repo.department,
            "Working Days": repo.workingDays,
            "Present": repo.present,
            "Absent": repo.absent,
            "Late": repo.late,
            "On Leave": repo.leave,
            "Total Work Hours": repo.totalHours,
            "Attendance Rate": `${repo.attendanceRate}%`
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Attendance Report"
        );

        XLSX.writeFile(
            workbook,
            `Attendance_Report_${month}.xlsx`
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 p-2 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Attendence Records</h1>
                    <p>View employee-wise attendance history and detailed records.</p>
                </div>
                <div className="space-x-3">
                    <button onClick={handleExport} className="btn btn-soft btn-warning">Export Records</button>
                </div>
            </div>
            <div className="overflow-x-auto bg-gray-100 m-6 py-3 rounded-3xl">

                <div className="flex justify-between items-center mx-0 md:mx-6">
                    <div>
                        <h2 className="text-xl font-bold">Employee Attendance History</h2>
                        <p>
                            Summary for {format(selectedDate, "MMMM yyyy")}
                        </p>
                    </div>
                    <div className="space-x-4">
                        <input
                            type="text"
                            placeholder="Type here"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input w-60"
                        />

                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => date && setSelectedDate(date)}
                            dateFormat="MMM yyyy"
                            showMonthYearPicker
                            maxDate={new Date()}
                            portalId="root"
                            popperPlacement="bottom-start"
                            className="select select-primary w-30 text-center cursor-pointer"
                        />
                    </div>
                </div>
                <table className="table w-280 mx-auto mt-4">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            {/* <th>#</th> */}
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Working Days</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Late</th>
                            <th>On Leave</th>
                            <th>Total Work Hours</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="9" className="text-center py-8">
                                    Loading attendance records...
                                </td>
                            </tr>
                        ) : filteredRepo.length > 0 ? (
                            filteredRepo.map((repo) => (
                                <tr key={repo.employee_id}>
                                    <td>{repo.employee_id}</td>
                                    <td>{repo.employee_name}</td>
                                    <td>{repo.workingDays}</td>
                                    <td className="text-green-600">{repo.present}</td>
                                    <td className="text-red-600">{repo.absent}</td>
                                    <td className="text-amber-600">{repo.late}</td>
                                    <td className="text-fuchsia-600">{repo.leave}</td>
                                    <td>{repo.totalHours}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-success"
                                            title="Correct"
                                        >
                                            Correct
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-8">
                                    No attendance records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AttendenceRecord;