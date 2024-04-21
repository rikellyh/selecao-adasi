import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../service/tasks";

export const useQueryGetTasks = () => {
  return useQuery({
    queryKey: ["GET_TASKS"],
    queryFn: () => getTasks(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
