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

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PayrollDashboard = ({ isAnimationActive = true }) => {
    const axiosSecure = useAxiosSecure()
    const [employees, setEmployees] = useState([])
    const [stat, setStat] = useState([])

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

    // function CustomizedPieChart({
    //     isAnimationActive = true,
    // }) 
    useEffect(() => {
        axiosSecure.get('/employees')
            .then(res => {
                setEmployees(res.data)
            })
    }, [])

    useEffect(() => {
        axiosSecure.get("/payroll_stat")
            .then(res => {
                setStat(res.data)
            })
    }, [])

    return (
        <div>
            <div className="my-3 space-x-9">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Total Employees</div>
                        <div className="stat-value font-bold flex items-center gap-1">{employees.length}</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Total Payroll Cost</div>
                        <div className="stat-value font-bold flex items-center gap-1"><span><TbCoinTaka /> </span>{stat[0]?.total[0]?.total}</div>
                        <div className="stat-desc pb-1 text-black">21% more than last month</div>
                        <progress className="progress w-56" value="70" max="100"></progress>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-xl font-bold">Employee Paid</div>
                        <div className="stat-value">{stat[0]?.paid?.length}</div>
                        <div className="stat-desc pb-1 text-black">of total {employees.length} employees</div>
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

            <div className="my-6 mx-4 bg-gray-200 border rounded-2xl">
                <div className="ps-25 pt-2">
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
        </div>
    )
}
export default PayrollDashboard;