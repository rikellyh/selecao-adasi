import { useMutation } from "@tanstack/react-query";

import { CreateActivityPayload } from "../../types/activities";
import { editActivities } from "../../service/activities";

export const useMutationEditActivity = () => {
  return useMutation({
    mutationFn: async (data: CreateActivityPayload) =>
      await editActivities(data),
  });
};
