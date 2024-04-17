import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../service/courses";

export const useQueryGetCourses = () => {
  return useQuery({
    queryKey: ["GET_COURSES"],
    queryFn: () => getCourses(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
