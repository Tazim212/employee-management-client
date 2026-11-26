import { useEffect, useState } from "react"
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { TbCoinTaka } from "react-icons/tb"
import {
    Pie,
    PieChart,
    Sector,
    useActiveTooltipDataPoints,
    useIsTooltipActive,
} from 'recharts';
import { useQuery } from "@tanstack/react-query";

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PayrollDashboard = ({ isAnimationActive = true }) => {
    const axiosSecure = useAxiosSecure()
    const [employees, setEmployees] = useState([])
    const [stat, setStat] = useState([])

    const { data: deptPayroll = [], isLoading } = useQuery({
        queryKey: ['dept_payroll'],
        queryFn: async () => {
            const res = await axiosSecure.get("/dept_payroll")
            return res.data;
        }
    })
    const employee = employees.result || []

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
    }) => {
        if (
            cx == null ||
            cy == null ||
            innerRadius == null ||
            outerRadius == null
        ) {
            return null;
        }

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const ncx = Number(cx);
        const ncy = Number(cy);

        const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={16}
            >
                <tspan x={x} dy="-0.6em">
                    {name}
                </tspan>
                <tspan x={x} dy="1.2em">
                    {`${((percent ?? 1) * 100).toFixed(0)}%`}
                </tspan>
            </text>
        );
    };

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
            name: "paid",
            value: stat[0]?.paid?.length || 0,
        },
        {
            name: "pending",
            value: stat[0]?.pending?.length || 0,
        },
        {
            name: "processing",
            value: stat[0]?.processing?.length || 0,
        },
    ];


    useEffect(() => {
        axiosSecure.get('/employees')
            .then(res => {
                setEmployees(res.data)
            })
    }, [])

    const deptCount = employee.reduce((acc, e) => {
        const dept = e.employee_department;
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});

    const formatNumber = (number) => {
        return new Intl.NumberFormat("en", {
            notation: "compact",
            compactDisplay: "short",
        }).format(number);
    };

    useEffect(() => {
        axiosSecure.get("/payroll_stat")
            .then(res => {
                setStat(res.data)
            })
    }, [])

    if (isLoading) {
        return <h2 className="text-center text-xl pt-20">Loadingg.......</h2>
    }
    return (
        <div>
            <div className="my-3 space-x-9">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Total Employees</div>
                        <div className="stat-value font-bold flex items-center gap-1">{employee.length}</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Total Payroll Cost</div>
                        <div className="stat-value font-bold flex items-center gap-1"><span><TbCoinTaka /> </span>{formatNumber(stat[0]?.total[0]?.total)}</div>
                        <div className="stat-desc pb-1 text-black">21% more than last month</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Employee Paid</div>
                        <div className="stat-value">{stat[0]?.paid?.length}</div>
                        <div className="stat-desc pb-1 text-black">of total {employee.length} employees</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Pending</div>
                        <div className="stat-value">{stat[0]?.pending?.length}</div>
                        <div className="stat-desc pb-1 text-black">21% more than last month</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Processing</div>
                        <div className="stat-value">{stat[0]?.processing?.length}</div>
                        <div className="stat-desc pb-1 text-black">Being Verified</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>
            </div>

            {/* payment status  */}
            <div className="my-6 mx-4 bg-gray-200 border rounded-2xl">
                <div className="ps-8 pt-2">
                    <h1 className="text-2xl font-bold">Payment Status</h1>
                    <p>March payroll progress</p>
                </div>
                <div className="flex items-center-safe gap-2">
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', height: 400, }} responsive>
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
                    <div className="text-lg font-semibold">
                        <p><span aria-label="success" className="status bg-blue-800"></span> Paid</p>
                        <p><span aria-label="success" className="status status-success"></span> Pending</p>
                        <p><span aria-label="success" className="status status-warning"></span> Processing</p>
                    </div>
                </div>
            </div>

            {/* department wise total salary  */}

            <div className="my-6 mx-4 bg-gray-200 border rounded-2xl">
                <div className="ms-4 py-7">
                    <h2 className="text-2xl font-bold">Department Payroll</h2>
                    <p>Salary distribution by team</p>
                </div>
                <div className="flex flex-col gap-4 m-4">
                    <div className="flex flex-col">
                        <label className="font-semibold">IT Department</label>
                        <span className="text-sm">Total Employees {deptCount.IT}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <progress className="progress progress-primary full" value="70" max="100"></progress>
                        <span className="flex items-center gap-1.5 font-bold"><TbCoinTaka></TbCoinTaka> {deptPayroll[4]?.total}</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">HR & Admin</label>
                        <span className="text-sm">Total Employees {deptCount["Admin & HR"]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <progress className="progress progress-secondary full" value="50" max="100"></progress>
                        <span className="flex items-center gap-1.5 font-bold"><TbCoinTaka></TbCoinTaka> {deptPayroll[3]?.total}</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Accounts</label>
                        <span className="text-sm">Total Employees {deptCount.Accounts}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <progress className="progress progress-success full" value="80" max="100"></progress>
                        <span className="flex items-center gap-1.5 font-bold"><TbCoinTaka></TbCoinTaka> {deptPayroll[2]?.total}</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Audit</label>
                        <span className="text-sm">Total Employees {deptCount.Audit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <progress className="progress progress-warning full" value="40" max="100"></progress>
                        <span className="flex items-center gap-1.5 font-bold"><TbCoinTaka></TbCoinTaka> {deptPayroll[1]?.total}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default PayrollDashboard;