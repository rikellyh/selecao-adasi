import { useQuery } from "@tanstack/react-query";

import { getActivities } from "../../service/activities";

export const useQueryGetActivities = () => {
  return useQuery({
    queryKey: ["GET_ACTIVITIES"],
    queryFn: () => getActivities(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
