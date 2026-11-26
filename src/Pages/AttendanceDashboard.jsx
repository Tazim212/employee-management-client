import { FaRegClock, FaXmark } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";
import { PiLeaf } from "react-icons/pi";
import {
    Pie,
    PieChart,
    Sector,
    useActiveTooltipDataPoints,
    useIsTooltipActive,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AttendanceDashboard = ({ isAnimationActive = true }) => {
    const axiosSecure = useAxiosSecure()

    const { data: todays = [] } = useQuery({
        queryKey: ["today_att"],
        queryFn: async () => {
            const res = await axiosSecure.get("/today_stat")
            return res.data
        }
    })

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees")
            return res.data
        }
    })

    const employee = employees.result || []

    const weeklyData = todays?.weekly || [];
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
        value,
    }) => {
        if (
            cx == null ||
            cy == null ||
            innerRadius == null ||
            outerRadius == null
        ) {
            return null;
        }

        // value 0 ba 8% er kom hole label dekhabe na
        if (!value || (percent ?? 0) < 0.08) {
            return null;
        }

        const radius = innerRadius + (outerRadius - innerRadius) * 0.65;

        const ncx = Number(cx);
        const ncy = Number(cy);

        const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fontWeight={600}
            >
                <tspan x={x} dy="-0.6em" alignmentBaseline="baseline">
                    {name}
                </tspan>
                <tspan x={x} dy="1.2em">
                    {`${((percent ?? employees.length) * 100).toFixed(0)}%`}
                </tspan>
            </text>
        );
    };
    // const renderCustomizedLabel = ({
    //     cx,
    //     cy,
    //     midAngle,
    //     innerRadius,
    //     outerRadius,
    //     percent,
    //     name,
    // }) => {
    //     if (
    //         cx == null ||
    //         cy == null ||
    //         innerRadius == null ||
    //         outerRadius == null
    //     ) {
    //         return null;
    //     }

    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    //     const ncx = Number(cx);
    //     const ncy = Number(cy);

    //     const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    //     const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    //     return (
    //         <text
    //             x={x}
    //             y={y}
    //             fill="white"
    //             textAnchor="middle"
    //             dominantBaseline="central"
    //             fontSize={16}
    //         >
    //             <tspan x={x} dy="-0.6em">
    //                 {name}
    //             </tspan>
    //             <tspan x={x} dy="1.2em">
    //                 {`${((percent ?? 1) * 100).toFixed(0)}%`}
    //             </tspan>
    //         </text>
    //     );
    // };

    // Custom Pie Shape
    const MyCustomPie = (props) => {
        const p = useActiveTooltipDataPoints();
        const isAnyPieActive = useIsTooltipActive();
        const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
        let fillOpacity;
        if (isAnyPieActive && !isThisPieActive) {
            fillOpacity = 0.5;
        } else {
            fillOpacity = 1;
        }
        return (
            <Sector
                {...props}
                fill={COLORS[props.index % COLORS.length]}
                stroke="none"
                fillOpacity={fillOpacity}
                style={{ transition: 'fill-opacity 0.3s ease' }}
            />
        );
    };

    const data = [
        {
            name: "present",
            value: todays?.present || 0,
        },
        {
            name: "absent",
            value: todays?.absent || 0,
        },
        {
            name: "late",
            value: todays?.late || 0,
        },
    ];

    const to12Hour = (time) => {
        if (!time) return "--";
        const [h, m] = time.split(":");
        const hour = Number(h);
        return `${hour % 12 || 12}:${m}`;
    };

    const { data: recent = [] } = useQuery({
        queryKey: ["recent_checkins"],
        queryFn: async () => (await axiosSecure.get("/recent_checkins?limit=5")).data,
        refetchInterval: 5000, // 30 sec por por auto refresh
    });


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4 my-5">
                <div className="stats w-60 shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Present Today <span className="p-3 bg-emerald-100 rounded-xl"><IoMdCheckmark /></span></div>
                        <div className="stat-value">{todays.present}</div>
                        <div className="stat-desc">{((todays.present / employee.length) * 100).toFixed(1)}% of {employee.length} employees</div>
                    </div>
                </div>
                <div className="stats w-60 shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Absent Today<span className="p-3 bg-red-100 rounded-xl"><MdOutlineClear /></span></div>
                        <div className="stat-value flex items-center">{todays.absent}</div>
                        <div className="stat-desc">10% of total workforce</div>
                    </div>
                </div>
                <div className="stats w-60 shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">Late Today <span className="p-3 bg-purple-100 rounded-xl"><FaRegClock /></span></div>
                        <div className="stat-value">{todays.late}</div>
                        <div className="stat-desc">6.7% arrived after 9:00 AM</div>
                    </div>
                </div>
                <div className="stats w-60 shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
                    <div className="stat">
                        <div className="text-md flex items-center gap-2">On Leave <span className="p-3 bg-blue-100 rounded-xl"><PiLeaf /></span></div>
                        <div className="stat-value">{todays.onLeave}</div>
                        <div className="stat-desc">4.1% approved leave</div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-2 mx-3">

                <div className="w-1/2">
                    <div className="my-5 mx-4 bg-gray-200 border rounded-2xl shadow-sm p-4">
                        <div className="ps-4 pt-2 pb-4">
                            <h1 className="text-2xl font-bold">Weekly Attendance Trend</h1>
                            <p className="text-gray-500">Daily attendance for this week</p>
                        </div>

                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={weeklyData}
                                    margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
                                    barGap={2}
                                    barCategoryGap="10%"
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.04)" }}
                                        contentStyle={{
                                            borderRadius: 8,
                                            border: "none",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                        }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="Present" fill="#10B981" radius={[8, 8, 0, 0]} barSize={28} />
                                    <Bar dataKey="Absent" fill="#ef4444" radius={[8, 8, 0, 0]} barSize={28} />
                                    <Bar dataKey="Late" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={28} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mx-1 bg-gray-200 border rounded-2xl w-1/2">
                    <div className="ps-3 pt-2">
                        <h1 className="text-2xl font-bold">Today’s Overview</h1>
                        <p>Live attendance distribution</p>
                    </div>
                    <div className="flex justify-self-center-safe gap-4">
                        <PieChart style={{ width: '300px', maxWidth: '500px', height: 370 }} responsive>
                            <Pie
                                data={data}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                dataKey="value"
                                nameKey="name"
                                isAnimationActive={isAnimationActive}
                                shape={MyCustomPie}
                            />
                        </PieChart>
                        <div className="text-lg font-semibold pt-30">
                            <p><span aria-label="success" className="status bg-blue-800"></span> Present</p>
                            <p><span aria-label="success" className="status status-success"></span> Absemt</p>
                            <p><span aria-label="success" className="status status-warning"></span> Late</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto my-6">
                <table className="table w-280 mx-auto">
                    <thead>
                        <tr className="bg-gray-500 text-gray-100">
                            {/* <th>#</th> */}
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recent.map((rec, i) =>
                                <tr key={i}>
                                    <td>{rec.employee_id}</td>
                                    <td>{rec.employee_name}</td>
                                    <td className="font-semibold">{rec.department}</td>
                                    <td>{rec.check_in}</td>
                                    <td>{to12Hour(rec.check_out)}</td>
                                    <td><div className="badge badge-soft badge-primary">{rec.status}</div></td>
                                    <td className="space-x-2 flex">
                                        <button className="btn btn-outline btn-success" title="Correct">View</button>
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
export default AttendanceDashboard;