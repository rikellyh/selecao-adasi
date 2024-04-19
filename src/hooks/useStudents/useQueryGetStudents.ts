import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../../service/students";

export const useQueryGetStudents = () => {
  return useQuery({
    queryKey: ["GET_STUDENTS"],
    queryFn: () => getStudents(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
