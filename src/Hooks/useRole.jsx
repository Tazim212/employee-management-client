import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role = "user", isLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}/role`)
            console.log(res.data)
            return res.data.role
        }
    })
    return { role, isLoading }
}
export default useRole;