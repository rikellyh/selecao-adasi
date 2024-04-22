import { useMutation } from "@tanstack/react-query";

import { EndActivity } from "../../types/activities";
import { endActivities } from "../../service/activities";

export const useMutationEndActivity = () => {
  return useMutation({
    mutationFn: async (data: EndActivity) => await endActivities(data),
  });
};
