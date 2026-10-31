import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Promotion = () => {
    const axiosSecure = useAxiosSecure()

    const { data: promotions = [] } = useQuery({
        queryKey: ["promotions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/promotion")
            return res.data
        }
    })

    return (
        <div>
            <section className="flex justify-between items-center p-3 mx-5 bg-gray-300 rounded-xl">
                <h2 className="text-2xl font-bold">Promotion</h2>
                <Link to="/dashboard/module_hr/promo_form"><button className="btn btn-info">Add promotion</button></Link>
            </section>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-11/12 mx-6 my-3">
                    <thead className="bg-emerald-700 text-gray-100">
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Previous Designation</th>
                            <th>New Designation</th>
                            <th>Promotion Date</th>
                            <th>Effective Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promotions.map((promo) =>
                                <tr key={promo._id}>
                                    <td>{promo.employee_id}</td>
                                    <td>{promo.employee_name}</td>
                                    <td>{promo.current_designation}</td>
                                    <td>{promo.new_designation}</td>
                                    <td>{promo.promotion_date}</td>
                                    <td>{promo.effective_date}</td>
                                    <td>
                                        <button>View</button>
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
export default Promotion;