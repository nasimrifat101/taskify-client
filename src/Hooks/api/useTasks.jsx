import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";
import useAuth from "../useAuth";

const useTasks = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()

    const {data: tasks, refetch,isLoading} = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            return res.data
        }
    })
    return {tasks, refetch, isLoading}
};

export default useTasks;