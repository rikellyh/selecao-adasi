import { useMutation } from "@tanstack/react-query";

import { createActivities } from "../../service/activities";
import { CreateActivityPayload } from "../../types/activities";

export const useMutationCreateActivities = () => {
  return useMutation({
    mutationFn: async (data: CreateActivityPayload) =>
      await createActivities(data),
  });
};
