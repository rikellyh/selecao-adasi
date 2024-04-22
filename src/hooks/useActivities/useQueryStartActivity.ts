import { useMutation } from "@tanstack/react-query";

import { StartActivity } from "../../types/activities";
import { startActivities } from "../../service/activities";

export const useMutationStartActivity = () => {
  return useMutation({
    mutationFn: async (data: StartActivity) => await startActivities(data),
  });
};
